# Student Feedback System

A simple serverless Student Feedback System built as part of the ShadowFox AWS Cloud Internship.

## Project Overview

This project is a small cloud-hosted web application that allows students to submit feedback through a web form.

The frontend is hosted on Amazon S3, while the feedback request is processed using AWS Lambda through Amazon API Gateway.

## AWS Services Used

- **Amazon S3** – Hosts the static website files.
- **Amazon API Gateway** – Receives feedback requests through an HTTP API.
- **AWS Lambda** – Processes the submitted feedback and returns a response.

## Technologies Used

- HTML
- CSS
- JavaScript
- Python
- AWS

## Architecture

```text
Student
   |
   v
S3 Static Website
   |
   | POST /feedback
   v
API Gateway
   |
   v
AWS Lambda
   |
   v
Success Response
