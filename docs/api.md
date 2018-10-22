# API

<h3><b>Authorization</b></h3>

* /api/register/ - POST <br>
    Accepts a json with two parameters: email and password. If user exists and is confirmed message with status 401 is sent. Otherwise new user is created and the password is generated with algorithm SHA256. After this email with registration confirmation is sent to email that user entered and response with status 201.
     
* /api/confirm/&lt;str:token&gt; GET <br>
    Token accepted in url and parsed. If token is expired message with status 400 returned, if not, user status is changed to confirmed and confirmation date is added to the record. If success status 200 returned

* /api/login POST <br>
    Accepts json with email and password. If user with such email and password is registered and confirmed return 200 status code and add user_id to session. Otherwise, error with message and status code 400

* /api/logout POST <br>
    Doesn't accept anything, clears session and returns message with status 200

* /api/reset POST <br>
    Accepts json with email field and if user with such email is registered token for reset is generated and sent on aforesaid email with 200 status returned, otherwise, response with 400 code is returned.
    
* /api/password_reset/&lt;str:token&gt; PUT <br>
    Accepts previously generated token in url and new password in json. If password is in correct format it's changed and status 200 is sent.  
    


<h3><b>File Management</b></h3>

* /api/upload/ POST
* /api/download/&lt;int:dataset_id&gt; GET 
* /api/temp_link/&lt;token&gt; GET
* /api/delete_file/&lt;int:file_id&gt; GET
* /api/send_file/&lt;int:dataset_id&gt; POST

<h3><b>Data set information</b></h3>

* /api/statistics/&lt;int:dataset_id&gt; GET
* /api/get_rows/&lt;int:dataset_id&gt;/&lt;int:number_of_rows&gt; GET

<h3><b>Filtration</b></h3>

* /api/get_metadata/&lt;file_id&gt; POST
* /api/count_rows POST