# Person API Documentation

## Introduction

This API allows you to perform get operations on an 'event' resource in a MySQL database.

## Demo

Make a request to this url to https://vikings-events-backend-production.up.railway.app/

```To get event with id 2 test with: https://vikings-events-backend-production.up.railway.app/api/events/2```

## Installation

1. Ensure you have Node.js, sequelize and MySQL installed on your machine.
2. Clone the GitHub repository.
3. Install the required packages using `npm install`.
4. Start the server using `npm run dev`.

## Endpoint

### GET /api/:eventId

Retrieves an event's data from the database.

**Request:**

No body required. The event id is passed as a parameter in the URL.

**Response:**

Returns the person's data:

```
{
    "status": status_code,
    "message": string,
    "data": {
        "id": string,
        "title": string,
        "description": string,
        "creator_id": string,
        "location": string,
        "start_date": date,
        "end_date": date,
        "start_time": time,
        "end_time": time,
        "thumbnail": url,
        "createdAt": datetime,
        "updatedAt": datetime
    }
}
```

## Errors and Bad response

In the case of an error or a `404 request` the API responds with a defined status code and an error message. The API will return:


```
{
"status": status_code,
"message": "error message",
"error": error details,
}
```

## Examples

2. To retrieve the data of an event with an id of "1" from the database, you would send a `GET` request as such: `http://localhost:{PORT}/api/events/1`. No body is required. The event id is passed as a parameter in the url.

You should receive a json as such:
```
{
    "status": status_code,
    "message": string,
    "data": {
        "id": string,
        "title": string,
        "description": string,
        "creator_id": string,
        "location": string,
        "start_date": date,
        "end_date": date,
        "start_time": time,
        "end_time": time,
        "thumbnail": url,
        "createdAt": datetime,
        "updatedAt": datetime
    }
}
```

## Limitations & Assumptions

The API is able to return only 3 event data from the database. Any query with an id greater than 3 will return a `404` response.
