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

* /api/upload/ POST <br>
    Accepts file - 'upload_file' from request and gets user id from session. If there is no file uploaded or file extension is not allowed status code 400 returned, otherwise, result object with file attributes returned with status 201.
    
* /api/download/&lt;int:dataset_id&gt; GET <br>
    Accepts dataset id in request url and user id from session. If there is no data set with such id or data set doesn't belong to user who makes request response with status codes 404 or 403 returned respectively. If dataset points on file without filter, original file returned from local storage and, if not, file with rows that included in data set is generated and sent with name 'result.xlsx'.
    
* /api/send_file/&lt;int:dataset_id&gt; POST <br>
    Accepts json with list of emails and dataset id in url. If generated dataset size is bigger than UPLOAD_FILE_LIMIT in configs, dataset is saved to temp folder and link for downloading, sent to emails from the list, otherwise, generated file is sent. Returns message with status 201.

* /api/temp_link/&lt;token&gt; GET <br>
    Gets token from url and send user a file to download if token is valid and not expired. Message with status code 200 returned.

* /api/delete_file/&lt;int:file_id&gt; GET <br>
    Accepts file id from url and checks if user has rights to delete file, otherwise, returns code 404 or 403. If has, deletes file from local storage and database. All datasets deleted on cascade. Response code 200 is returned.

<h3><b>Data set information</b></h3>

* /api/statistics/&lt;int:dataset_id&gt; GET <br>
    Accepts id of dataset from uri and checks if dataset exists and if it belongs to the user from session, if not, responses with 404 and 403 status codes. If everything is all right json with statistics data returned with status code 200.
    
* /api/get_rows/&lt;int:dataset_id&gt;/&lt;int:number_of_rows&gt; GET <br>
    Accepts id of dataset and number of rows to show from uri and checks if dataset exists and if it belongs to the user from session, if not, responses with 404 and 403 status codes. If everything is all right json with header and first x number of rows returned with status code 200. 

<h3><b>Filtration</b></h3>

* /api/save_filter POST <br>
    Accepts json must contain three fields: name, params and file name. Filter with given name and parameters is created and added to database. For created filter new dataset is created which will have reference to given file and to newly created filter. HTTP status code 201 returned

* /api/apply_filter POST <br>
    Accepts json must contain three fields: name, params and file name. Filter with given name and parameters is created and added to database. For this filter and given file FilterApplier makes filtration and returns list of rows that must be contained in resulting dataset. New dataset with reference to file, filter and with list of included rows is created and added to database. Status code 201 returned.

* /api/get_metadata/&lt;file_id&gt; POST <br>
    Accepts file id from uri and counts how many rows file have and returns json with number of rows in file and data about names of columns, all values of each column and their number of occurrences with status code 200.  
    
* /api/count_rows POST <br>
    Accepts json with id of file and filtration parameters. Counts number of rows of file which come under these parameters. Returns number of rows and status code 200