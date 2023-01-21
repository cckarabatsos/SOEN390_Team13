# Models

Contains all the models for validating incoming request data. These can be in the form of classes called by the controller or schemas used by routes.

Below are examples of how to implement the schemas into the controllers

### Checking Validity of Request Data

```typescript
// Inializing sample request
let request = {
    postID: 1,
    ownerID: 1,
    timestamp: "'2007-03-28-14.50",
    content: "Hello",
};

// running built in function to validate
post_schema.validate(request).catch(function (err) {
    err.name; // returns error type
    err.errors; // returns which fields are false
});
```

### Casting returned data from db

```typescript
// creating sample response from db
let db_response = {
    postID: 1,
    ownerID: 1,
    timestamp: "'2007-03-28-14.50",
    content: "Hello",
};
//This will add the fields that are not seen as they are default data
let response = post_schema.cast(db_response);
/*
console.log(response) => {
    postID: 1,
    ownerID: 1,
    timestamp: "'2007-03-28-14.50",
    content: "Hello",
}
*/
```
