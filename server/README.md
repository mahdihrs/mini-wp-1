# mini-wordpress-server

# Server Documentation

## User End Points
|Route|HTTP|Header(s)|Body|Description|
|---------|---------|---------|---------|---------|
|_/register_|**POST**|none|name, email, password, watchedTags|Manual sign up
|_/login_|**POST**|none|email, password|Manual Sign In and Google Sign In|
|_/my-articles-based-on-watched-tags_|**GET**|access_token|none|Get suggested articles based on user's watched tags|
|_/get-user-info_|**GET**|access_token|none|Get user login info|
|_/edit-watched-tag_|**POST**|access_token|Tag which will be updated|Edit user's watched tags|

## Article End Points
|Route|HTTP|Header(s)|Body|Description|
|---------|---------|---------|---------|---------|
|_/articles_|**GET**|none|none|Get all articles|
|_/articles_|**POST**|access_token|title, content, author, image, tags|Create article|
|_/articles/get-articles_|**GET**|access_token|none|Get articles made by user login|
|_/articles/generate-tags_|**POST**|access_token|Image File|Auto-generate article's tags based on image recognition powered by Google Vision|
|_/articles/find-by-tags/:id_|**GET**|none|none|Find articles by tag|
|_/articles/:id_|**GET**|none|none|Get specific article find by article's id|
|_/articles/:id_|**PUT**|access_token|none|Edit article|
|_/articles/:id_|**DELETE**|access_token|none|Delete article|

## Usage
```
npm install
npm start
live-server --host=localhost (Run it on client side)
```
> Run on http://localhost:8080