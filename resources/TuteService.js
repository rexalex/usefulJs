var Entity = {
    Tutes: "Tutes",
    Tute: "Tute",

    Unit: "Unit",
    Units: "Units",

    Tutor: "Tutor",
    TuteTutor: "TuteTutor",
    Status: "Status",
    ModifiedBy: "ModifiedBy",
    Owner: "Owner",

    Question: "Question",
    Questions: "Questions",

    Answer: "Answer",
    Answers: "Answers",

    User: "User",
    Notes: "Notes",

    Scenes: "Scenes",

    Group: "Group",

    Section: "Section",
    Sections: "Sections",

    Slides: "Slides",

    Youtube: "Youtube",

    Vimeo: "Vimeo",

    UrlCheck: "UrlCheck",

    Library: "LibraryResources",

    DeleteLibrary: "DeleteLibraryResource",

    UploadLibrary: "GetLibraryResourceUploadLink",

    Create: "CreateDraft",
    Drafts: "Drafts",
    Publish: "Publish",

    CoverImages: "TuteCoverImages",
    CoverImage: "TuteCoverImage",

    UploadResource: "UploadResource",

    Cover: "DefaultCoverImage",

    Link: "Link",
    Like: 'Like',
    UnLike: 'UnLike',

    TuteLikes: "TuteLikes",

    TuteDownloads: "TuteDownloads",

    Read: "Read",

    UnRead: "UnRead",

    Html: "Html",

    TuteEmbedPictures: 'TuteEmbedPictures'
};

angular.module('services', ['ngResource'])


    .factory('Read', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/Question/Read", { entity: '@entity' }, { "update": { method: "PUT" } });
        }])

    .factory('UrlCheck', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/Unit/isUrlAccessible?url=:link", { link: '@link' });
        }])

    .factory('UploadResource', ['$resource',
        function ($resource) {
            return $resource(rootUrl + "/Home/UploadResource", { });
        }])

    .factory('TuteDownload', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/TuteDownload/:id", { id: '@Id' }, { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Link', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/answer/link?url=:link", { link: '@link' });
        }])

    .factory('Tutes', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/tute/:id/:entity?username=:username&permalinkid=:permalinkid&itemsPerPage=100", { id: '@Id', entity: '@entity', permalinkid: '@permalinkid', username: '@username' });
        }])

    .factory('Tute', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/tute/:id/", { id: '@Id' }, { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('TutePermissions', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/tute/:id/TutePermissions?permission=2", { id: '@Id' }, { });
        }])

    .factory('UserAutocomplete', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/User/UserAutocomplete?searchText=:searchText", { searchText: '@searchText' }, {});
        }])

    .factory('UserTutePermissions', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/TutePermission/:id", { id: '@Id' }, { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('TuteDuplicate', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/tute/:id/Duplicate", { id: '@Id' }, {  });
        }])

    .factory('Email', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/tute/1/SendMail", {});
        }])

    .factory('AllTutes', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/tute/DashBoardTutes?itemsPerPage=1000&filterUser=:filterUser&filterGroup=:filterGroup&orderBy=:orderBy",
                { filterUser: '@filterUser', filterGroup: '@filterGroup', orderBy: '@orderBy' });
        }])

    .factory('ExploreTutes', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/tute/Explore?itemsPerPage=20",
                { });
        }])

    .factory('UserGroups', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/UserGroup");
        }])

    .factory('Tutors', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/tutor/:id/:entity", { id: '@Id', entity: '@entity' }, { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('TuteTutors', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/tutor/:id/:entity", { id: '@Id', entity: '@entity' }, { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Units', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/unit/:id/:entity?page=:page&orderBy=:orderfield", { id: '@Id', entity: '@entity', page: '@page', orderfield: '@orderfield' }
                , { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Unit', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/unit/:id/:entity?page=:page", { id: '@Id', entity: '@entity', page: '@page' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Sections', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/section/:id/:entity", { id: '@Id', entity: '@entity' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Scenes', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/scene/:id/:entity", { id: '@Id', entity: '@entity' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Slides', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/slide/:id/:entity", { id: '@Id', entity: '@entity' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Questions', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/question/:id/:entity", { id: '@Id', entity: '@entity' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Answers', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/answer/:id/:entity", { id: '@Id', entity: '@entity' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Notes', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/note/:id/:entity", { id: '@Id', entity: '@entity' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Users', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/user/:id/:entity", { id: '@Id', entity: '@entity' });
        }])
    // Youtube API V2
    .factory('Youtube', ['$resource',
        function ($resource) {
            return $resource(youtubeApiUrlV2 + "/videos?q=:searchTerm&orderby=relevance&start-index=:startindex&max-results=:maxresults&alt=json&callback=JSON_CALLBACK&v=2",
                { searchTerm: '@searcTerm', startindex: '@startindex', maxresults: '@maxresults' },
                { "getjsonp": { method: "JSONP" } });
        }])

    //// Youtube API V3
    //.factory('Youtube', ['$resource', 
    //function ($resource) {
    //    return $resource(youtubeApiUrlV3 + "/search?part=snippet&maxResults=:maxresults&order=relevance&pageToken=:pageToken&q=:searchTerm&type=video&callback=JSON_CALLBACK&key=AIzaSyASeqDOAwx72JZ75oi22r3VR5ZsRQY_768",
    //        { maxresults: '@maxresults', pageToken: '@pageToken', searchTerm: '@searchTerm'},
    //        { "getjsonp": { method: "JSONP" } });
    //}])

    .factory('Vimeo', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/Vimeo/VimeoSearch?text=:searchTerm&itemsPerPage=:itemsPerPage&page=:pageNo&orderBy=:orderBy",
                { searchTerm: '@searchTerm', itemsPerPage: '@startindex', pageNo: '@pageNo', orderBy: '@orderBy' });
        }])

    .factory('VimeoSingleVideo', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/Vimeo/GetVimeoVideoInfo?videoId=:videoId",
                { videoId: '@videoId' });
        }])

    //.factory('YoutubeSingleVideo', ['$resource',
    //    function ($resource) {
    //        return $resource(youtubeApiUrlV2 + "/videos/:id?callback=JSON_CALLBACK&v=2&alt=jsonp", { id: '@Id' },
    //            { "getjsonp": { method: "JSONP" } });
    //    }])

    .factory('YoutubeSingleVideo', ['$resource',
        function ($resource) {
            return $resource(youtubeApiUrlV2 + "/videos?q=:id&orderby=relevance&alt=json&callback=JSON_CALLBACK&v=2", { id: '@Id' },
                { "getjsonp": { method: "JSONP" } });
        }])

    .factory('Library', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/library/:id/:entity", { id: '@Id', entity: '@entity' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('GetUploadLink', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/library/:entity?libraryId=:id&fileName=:fileName&fileSize=:fileSize&duration=:duration",
                { entity: '@entity', id: '@Id', fileName: '@fileName', fileSize: '@fileSize', duration: '@duration' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('DeleteLibrary', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/library/:entity?libraryId=:id&resourceId=:resourceId", { entity: '@entity', id: '@Id', resourceId: '@resourceId' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('Cover', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/:entity", { entity: '@entity' },
                { "update": { method: "PUT" }, "remove": { method: "DELETE" } });
        }])

    .factory('GetUser', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/Authentication/GetAuthenticatedUser", {});
        }])
    .factory('TuteCoverImage', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/TuteCoverImage/:id", { id: '@Id' },
                { "remove": { method: "DELETE" } });
        }])

    .factory('DashboardText', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/DashboardText/1");
        }])

    .factory('PasswordReset', ['$resource',
        function ($resource) {
            return $resource(apiUrl + "/Authentication/PasswordResetRequest");
        }])

    .factory('GeneralVolume', function () {
        var service = {};

        service.data = 0.5;
        service.setData = function (x) {
            this.data = x;
        };
        return service;
    })

    .factory('UploadSender', function () {
        var service = {};

        service.data = null;
        service.setData = function (x) {
            this.data = x;
        };
        return service;
    })

    .factory('SeeQuestionInTute', function () {
        var service = {};

        service.tuteId = null;
        service.unitId = null;
        service.questionId = null;

        service.setData = function (tuteId, unitId, questionId) {
            this.tuteId = tuteId;
            this.unitId = unitId;
            this.questionId = questionId;
        };
        return service;
    })

    .factory('BrowserInfo', function () {
        var service = {};

        service.data = "";
        service.setData = function (x) {
            this.data = x;
        };
        service.getData = function () {
            return this.data;
        };
        return service;
    })
    .factory('CurrentUnitService', function () {
        var service = {};

        service.data = "";
        service.setData = function (x) {
            this.data = x;
        };
        service.getData = function () {
            return this.data;
        };
        return service;
    })
;

