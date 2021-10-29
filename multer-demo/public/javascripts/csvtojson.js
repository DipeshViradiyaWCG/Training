function storeData() {

    let storeDataArr = [];
    $( "input:checkbox[name=selection]:checked" ).each(function( ) {
        console.log($(this).data("record"));
        let record = $(this).data("record").split("-");
        let recordObj = {
            FirstName : record[0],
            LastName : record[1],
            Age : record[2]
        };//$(this).data("record").split("-");
        storeDataArr.push(recordObj);

    });

    console.log(storeDataArr);
    $.ajax({
        type: "POST",
        url: "/storecsv",
        //processData: true,
        // contentType: "json",
        data : { list : storeDataArr } ,
        
        success: function(res){
            console.log(res);
            $("#status").html("Uploaded...");
        },
        error: function (err) {
            console.log(err);
            $("#status").html(res);
        }
    });  

};

$(document).ready(function(){
    $("#storeData").css("visibility", "hidden");
    $("#form").submit(function (e) {
        e.preventDefault();

        $("#status").html("Uploading...");
        //$("#loader").show();

        setTimeout(() => {

                console.log("file", $("#csvfile")[0].files[0]); 
                // if($("#csvfile")[0].files[0].type == "text/csv"){
                    let fd =  new FormData();
                    fd.append("csvfile", $("#csvfile")[0].files[0]);

                    $.ajax({
                        type: "POST",
                        url: "/csvtojson",
                        processData: false,
                        contentType: false,
                        data :fd,

                        xhr: function () {
                            var myXhr = $.ajaxSettings.xhr();
                            console.log("myXhr ===============> ");
                            console.log(myXhr);

                            $(".upload-status").append("<div class=\"file-upload-status\">File - " + $("#csvfile")[0].files[0].name+ " => Status : <input type=\"range\" id=\"range\" min=\"0\" max=\"100\" value=\"\" step=\"50\" /> <span id=\"uploadstatus\"></span> % </div><br>");

                            if (myXhr.upload) {
                                myXhr.upload.addEventListener('progress', function (event) {
                                        var percent = 0;
                                        var position = event.loaded || event.position;
                                        var total = event.total;
                                        if (event.lengthComputable) {
                                            percent = Math.ceil(position / total * 100);
                                        }
                                        $("#uploadstatus").html(percent);
                                        console.log(percent, "for ", $("#csvfile")[0].files[0].name);
                                        $("#range").attr("value", percent.toString());
                                }, false);
                            }
                            return myXhr;
                        },
                        
                        success: function(res){
                            if(res.type=="success"){
                                console.log("success");
                                $("#status").html("Uploaded...");
    
                                $("#jsonDataTable").attr('border', '1');
                                $("#jsonDataTable").append("<tr><th>Selection</th><th>Index</th><th>FirstName</th><th>LastName</th><th>Age</th></tr>");
    
                                for(let resIterator = 0; resIterator < res.length; ++resIterator){
                                    let rowElement = "<tr><td><input type=\"checkbox\" id=\"selection-"+(resIterator+1)+"\" name=\"selection\" value=\"checkbox-"+(resIterator+1)+"\" data-record=\"" + res[resIterator].FirstName + "-" + res[resIterator].LastName + "-" + res[resIterator].Age + "\">  </td><td>"+(resIterator+1)+"</td><td>" + res[resIterator].FirstName + "</td><td>" + res[resIterator].LastName + "</td><td>" + res[resIterator].Age + "</td></tr>";
                                    $("#jsonDataTable").append(rowElement);
                                }
                                $("#storeData").css('visibility', 'visible');
                                // $("#status").html(JSON.stringify(res));
                            }else{
                                $("#status").html(res.message);    
                            }
                        },
                        error: function (err) {
                            console.log(err);
                            $("#status").html(err);
                        }
                    });    
                // } else {
                //     $("#status").html("Uploaded file size exceeds valid limit (1 MB) or is not the CSV file...");
                // }
            
        } ,1000);


    });


});
