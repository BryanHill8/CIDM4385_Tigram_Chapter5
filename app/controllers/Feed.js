var args = arguments[0] || {};

//this captures the event
OS_IOS && $.cameraButton.addEventListener("click", function(_event) {
	$.cameraButtonClicked(_event);
});

$.cameraButtonClicked = function(_event) {
	alert("user clicked camera button");
	
	var photoSource = Titanium.Media.getIsCameraSupported() ?
		Titanium.Media.showCamera : Titanium.Media.openPhotoGallery;
		
		PhotoSource({
			success : function(event) {
			//seonc argument is the callback
			processImage(event.media, function(processResponse) {

				if(processResponse.success){
					//create a row
					var row = Alloy.createController("feedRow", processResponse.model);
	
					//add the controller view, which is a row to the table
					if ($.feedTable.getData().length === 0) {
						$.feedTable.setData([]);
						$.feedTable.appendRow(row.getView(), true);
					} else {
						$.feedTable.insertRowBefore(0, row.getView(), true);
					}
	
					//photoObject = photoResp;					
				} else {
					alert('Error saving photo ' + processResponse.message);					
				}

			});
		},

function proccessImage(_mediaObject, _callback) {
	var photoObject = {
		image : _mediaObject,
		title : "Sample Photo" + new Date()
	}
	
	_callback(photoObject);
}

function loadPhotos() {
	var rows = [];

	// creates or gets the global instance of photo collection
	var photos = Alloy.Collections.photo || Alloy.Collections.instance("Photo");

	// be sure we ignore profile photos;
	var where = {
		title : {
			"$exists" : true
		}
	};

	//this is a method in the model - from backbone.js
	photos.fetch({
		data : {
			order : '-created_at',
			where : where
		},
		success : function(model, response) {
			photos.each(function(photo) {
				var photoRow = Alloy.createController("feedRow", photo);
				rows.push(photoRow.getView());
			});
			$.feedTable.data = rows;
			Ti.API.info(JSON.stringify(data));
		},
		error : function(error) {
			alert('Error loading Feed ' + error.message);
			Ti.API.error(JSON.stringify(error));
		}
	});
}

$.initialize = function() {
  loadPhotos();
};
