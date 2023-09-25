## Get User's Groups

# Overview

The "Get User Groups" route allows you to retrieve information about a user's group. This endpoint is useful for fetching user's groups.

# Endpoint: /api/v1/users/{user_id}/groups

# HTTP Method: GET

## Request Parameters

# Path Parameters

user_id (required): The unique identifier for the user whose group and image you want to retrieve.

# Response

The response will include information about the user's group and information about the groups.

```
    {
  "status": 200,
  "message": "User groups and images retrieved",
  "data": [
    {
      "groups": {
        "id": 1,
        "title": "people"
      },
      "images": [],
      "memberCount": 1
    },
    {
      "groups": {
        "id": 2,
        "title": "fam"
      },
      "images": [],
      "memberCount": 1
    },
    {
      "groups": {
        "id": 3,
        "title": "family"
      },
      "images": [
        {
          "id": 3,
          "url": "https://res.cloudinary.com/ol4juwon/image/upload/v1695448672/test/rnqjag2v7btzslrxoyzc.png"
        }
      ],
      "memberCount": 2
    }
  ]
}
```

# Error Responses

# 404 Not Found: If the user with the specified user_id does not exist.

{
"status": 404,
"message": "User not found",
"error": "Unable to fetch user with id 6666"
}

# 500 Internal Server Error: If there is an issue with the server while processing the request.

# Usage

To retrieve a user's group and profile image, make a GET request to the endpoint with the user_id of the desired user. The response will provide you with the user's group and a URL to their profile image.

Example in JavaScript using Axios:

const userId = '123456';
axios.get(`/api/users/${userId}/group-and-image`)
.then((response) => {
const userData = response.data;
console.log(`User ${userData.username} belongs to the ${userData.group} group.`);
console.log(`Profile image URL: ${userData.profile_image_url}`);
})
.catch((error) => {
console.error('Error:', error);
});

# Security

Ensure that you have proper authentication and authorization mechanisms in place to protect sensitive user data.

This documentation provides an overview of the "Get User's Groups" route, including its usage, request parameters, response format, error handling, and security considerations. Adapt it to fit your specific API and application needs.
