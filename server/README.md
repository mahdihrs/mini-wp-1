# mini-wordpress-server

# Server Documentation

## User End Points
|Route|HTTP|Header(s)|Body|Description|Success|Error
|---------|---------|---------|---------|---------|-------------|---------------|
|_/register_|**POST**|none|name, email, password, watchedTags|Manual sign up|Status(201); Data: { msg: 'New user has been added', user: newUser, id: id_user, name: 'Anita', tags: '[life, love]', token} | 1. Status(400); Message: 'Bad Request' 2. Status(500); Message: 'Internal server error'
|_/login_|**POST**|none|email, password|Manual Sign In and Google Sign In|Status(200); Data: name: user's name, email: user's email(Google Sign In) -- Status(200); Data: token| 1. Status(500); Message: 'Internal server error' 2. Status(422); Message: `Invalid email/password`,
|_/my-articles-based-on-watched-tags_|**GET**|access_token|none|Get suggested articles based on user's watched tags|`Status(200); Data: articleSuggestions: [{...}]` | `1. Status(500); Message: 'Internal server error', 2. Status(401); Message: 'Unauthorized Access' `
|_/get-user-info_|**GET**|access_token|none|Get user login info| `Status(200); Data: {...user-detail}` | `1. Status(500); Message: 'Internal server error' 2. Status(401); Message: 'Unauthorized Access'`
|_/edit-watched-tag_|**POST**|access_token|Tag which will be updated|Edit user's watched tags|`Status(200); Data: { msg: 'Watched tags has been successfully updated'` | `1. Status(500); Message: 'Internal server error' 2. Status(401); Message: 'Unauthorized Access'`

## Article End Points
|Route|HTTP|Header(s)|Body|Description|Success|Error
|---------|---------|---------|---------|---------|-------------|---------------|
|_/articles_|**GET**|none|none|Get all articles|`Status(200); Data: {articles: [{ ... }]}`|`1. Status(500); {msg: 'Internal server error'}`
|_/articles_|**POST**|access_token|title, content, author, image, tags|Create article|`Status(201); Data: {msg: 'Article has been successfully created', newArticle: {...new-article}}` | `1. Status(500); Message: 'Internal server error' 2. Status(401); Message: 'Unauthorized Access'`
|_/articles/get-articles_|**GET**|access_token|none|Get articles made by user login|`Status(200); Data: {articles: [{ ... }]}` | `1. Status(500); Message: 'Internal server error' 2. Status(401); Message: 'Unauthorized Access'`
|_/articles/generate-tags_|**POST**|access_token|Image File|Auto-generate article's tags based on image recognition powered by Google Vision|`Status(200); Data: labels: [{ ... }], image: https://storage.googleapis.com/...`| `1. Status(500); Message: 'Internal server error' 2. Status(401); Message: 'Unauthorized Access'`
|_/articles/find-by-tags/:id_|**GET**|none|none|Find articles by tag|`Status(200); Data: {articles: [{ ... }]}, tag: '...'` | `1. Status(500); Message: 'Internal server error' 2. Status(401); Message: 'Unauthorized Access'`
|_/articles/:id_|**GET**|none|none|Get specific article find by article's id|`Status(200); Data: {article: { ... }` | `1. Status(500); Message: 'Internal server error'`
|_/articles/:id_|**PUT**|access_token|none|Edit article| `Status(200); Data: {msg: 'Article successfully been updated'}` | `1. Status(500); Message: 'Internal server error' 2. Status(401); Message: 'Unauthorized Access'`
|_/articles/:id_|**DELETE**|access_token|none|Delete article| `Status(200); Data: {msg: 'Successfully delete the article'}` | `1. Status(500); Message: 'Internal server error' 2. Status(401); Message: 'Unauthorized Access'`

## Usage
```
npm install
npm start
live-server --host=localhost (Run it on client side)
```
> Run on http://localhost:8080