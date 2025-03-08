package main

import (
	"context"
	"log"
	"time"

	pb "example.com/asdf/proto"
)

func callSayHello(client pb.GreetServiceClient) {
	ctx, cancel := context.WithTimeout(context.TODO(), time.Second)
	defer cancel()

	res, err := client.SayHello(ctx, &pb.NoParam{})
	if err != nil {
		log.Fatal(err)
	}

	log.Println(res.Message)
}
