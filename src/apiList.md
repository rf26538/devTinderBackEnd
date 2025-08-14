
# DevTinder APIs

-POST /signup
-POST /login
-POST /logout

# ProfileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password -> Forgot password Api

# ConnectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
# We will make dynamic api for both above api
-POST /request/send/:status/:userId

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:resquestId
# We will make dynamic api for both above api
-POST /request/review/:status/:requestId

# UserRouter
-GET /user/received
-GET /user/connection
-GET /user/feed

# pagination
-GET /user/feed?page=1&limit=10  => 1 to 10  => .skip(0) & limit(10)
-GET /user/feed?page=2&limit=10  => 11 to 20 => .skip(10) & limit(10)
-GET /user/feed?page=3&limit=10  => 21 to 30 => .skip(20) & limit(10)

.skip() -> how many document you want to skip from 0 
.limit() -> how maney documents you want


Status :- ignored, intrested, accepted, rejected