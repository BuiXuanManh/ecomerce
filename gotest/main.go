package main

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Instance struct {
	Client *mongo.Client
	Db     *mongo.Database
}

var ng Instance

const dbName = "golang"
const uri = "mongodb://localhost:27017/" + dbName

type Employee struct {
	Id     string `json:"id,omitempty" bson:"_id,omitempty"`
	Name   string
	Age    int32
	Salary float64
}

func connect() error {
	option := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.TODO(), option)
	if err != nil {
		return err
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return err
	}
	ng = Instance{
		Client: client,
		Db:     client.Database(dbName),
	}
	return nil
}

func main() {
	if err := connect(); err != nil {
		log.Fatal(err)
	}
	r := gin.Default()
	r.GET("employees", func(ctx *gin.Context) {
		coll := ng.Db.Collection("employees")
		filter := bson.D{}
		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			ctx.JSON(http.StatusOK, gin.H{"err": err.Error()})
			return
		}
		var employees []Employee
		if err := cursor.All(context.TODO(), &employees); err != nil {
			ctx.JSON(http.StatusOK, gin.H{"err": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, employees)
	})
	r.POST("employee", func(ctx *gin.Context) {

		var employee Employee
		if err := ctx.ShouldBindJSON(&employee); err != nil {
			ctx.JSON(http.StatusOK, gin.H{"err": err.Error()})
		}
		coll := ng.Db.Collection(("employees"))
		insert, err := coll.InsertOne(context.TODO(), employee)
		if err != nil {
			ctx.JSON(http.StatusOK, gin.H{"err": err.Error()})
		}
		filter := bson.M{"_id": insert.InsertedID}
		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			ctx.JSON(http.StatusOK, gin.H{"err": err.Error()})
		}
		var result []bson.M
		if err := cursor.All(context.TODO(), &result); err != nil {
			ctx.JSON(http.StatusOK, gin.H{"err": err.Error()})
		}
		ctx.JSON(http.StatusOK, result)

	})
	r.PUT("/employee/:id", func(ctx *gin.Context) {
		id, err := primitive.ObjectIDFromHex(ctx.Param("id"))
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "id invalid"})
			return
		}
		var employee Employee
		if err := ctx.ShouldBindJSON(&employee); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
			return
		}
		coll := ng.Db.Collection("employees")
		filter := bson.M{"_id": id}
		update := bson.M{"$set": employee}
		result, err := coll.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
			return
		}
		if result.MatchedCount == 0 {
			ctx.JSON(http.StatusInternalServerError, gin.H{"err": "not found id"})
			return
		}
		employee.Id = ctx.Param("id")
		ctx.JSON(http.StatusOK, employee)
	})
	r.DELETE("employee/:id", func(ctx *gin.Context) {
		id, err := primitive.ObjectIDFromHex(ctx.Param("id"))
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
		}
		coll := ng.Db.Collection("employees")
		filter := bson.M{"_id": id}
		result, err := coll.DeleteOne(context.TODO(), filter)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
		}
		if result.DeletedCount == 0 {
			ctx.JSON(http.StatusInternalServerError, gin.H{"err": "delete fail"})
		}
		ctx.JSON(http.StatusOK, "ok")
	})
	r.Run(":8080")
}
