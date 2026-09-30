# Student Feedback System

A serverless Student Feedback System developed as part of the ShadowFox AWS Cloud Internship. This web application allows students to submit feedback through a simple web interface, with the data securely processed and stored using AWS cloud services.

## Project Overview

The Student Feedback System is a cloud-hosted web application built using a serverless architecture. Students can enter their name, email address, and feedback through a web form. The submitted information is sent to an AWS Lambda function through Amazon API Gateway and stored in Amazon DynamoDB.

The frontend is hosted on Amazon S3, making the application accessible through a web browser.

## AWS Architecture

```text
        Student
           |
           v
    Web Feedback Form
       (HTML, CSS, JS)
           |
           v
       Amazon S3
     (Static Website)
           |
           v
    Amazon API Gateway
           |
           v
       AWS Lambda
    (Request Processing)
           |
           v
     Amazon DynamoDB
     (inquiry-table)
```

## AWS Services Used

- **Amazon S3:** Hosts the static frontend files of the application.
- **Amazon API Gateway:** Provides HTTP endpoints to receive frontend requests.
- **AWS Lambda:** Processes GET and POST requests, validates submitted data, and communicates with DynamoDB.
- **Amazon DynamoDB:** Stores student inquiries in a NoSQL database.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- AWS SDK for JavaScript
- Amazon S3
- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB
- Git and GitHub

## Project Features

- Simple and user-friendly student feedback form.
- Accepts student name, email, and feedback.
- Generates a unique inquiry ID for each submission.
- Sends feedback to the backend using HTTP POST.
- Validates required fields before saving data.
- Stores submitted feedback in DynamoDB.
- Supports retrieving stored inquiries through HTTP GET.
- Handles CORS preflight requests.
- Returns success and error responses from the backend.

## How It Works

1. A student opens the feedback website hosted on Amazon S3.
2. The student enters their name, email address, and feedback.
3. JavaScript collects the form data and generates a unique inquiry ID.
4. The frontend sends a POST request to the API Gateway endpoint.
5. API Gateway invokes the AWS Lambda function.
6. Lambda validates the request and stores the inquiry in DynamoDB.
7. The backend returns a response to the frontend.
8. The website displays a success message after submission.

## Database Structure

**DynamoDB Table:** `inquiry-table`

| Attribute | Type | Description |
|---|---|---|
| inquiryId | String | Unique inquiry identifier and partition key |
| name | String | Student name |
| email | String | Student email address |
| message | String | Submitted feedback |

## Lambda Function

The backend is implemented in Node.js using the AWS SDK for JavaScript.

The Lambda function supports:

- **POST:** Validates and saves feedback to DynamoDB using PutItem.
- **GET:** Retrieves stored inquiries using Scan.
- **OPTIONS:** Handles CORS preflight requests.
- **Error handling:** Returns appropriate HTTP status codes for invalid requests and server errors.

Backend source code: `lambda/index.mjs`

## Repository Structure

```text
SHADOWFOX/
├── lambda/
│   └── index.mjs
├── index.html
├── feedback.js
├── script.js
├── style.css
└── README.md
```

## Deployment

1. Create an S3 bucket and upload the frontend files.
2. Configure the S3 bucket for static website hosting, as appropriate for the project.
3. Create a DynamoDB table named `inquiry-table`.
4. Deploy the Lambda function with the required DynamoDB permissions.
5. Configure API Gateway with the required HTTP methods and Lambda integration.
6. Configure CORS to allow requests from the frontend.
7. Connect the frontend JavaScript to the API Gateway endpoint.
8. Open the hosted website and submit a test inquiry.
9. Verify that the inquiry is stored in DynamoDB.

## Testing

The application was tested by submitting feedback through the frontend and verifying that the submitted inquiry appeared in the DynamoDB table.

The Lambda function also includes handling for missing fields, unsupported HTTP methods, and server-side errors.

## Learning Outcomes

- Understanding serverless application architecture.
- Hosting static websites using Amazon S3.
- Building HTTP APIs using Amazon API Gateway.
- Developing serverless backend logic using AWS Lambda.
- Storing and retrieving data using Amazon DynamoDB.
- Integrating frontend applications with cloud-based backend services.
- Managing project source code using GitHub.

## Internship Project

**Organization:** ShadowFox  
**Domain:** AWS Cloud Computing  
**Project:** Student Feedback System  
**Architecture:** Serverless Cloud Application

## Author

**Mohammed Faizaan Sami**

Electronics and Communication Engineering  
PES University

## License

This project was developed for educational and internship purposes.
