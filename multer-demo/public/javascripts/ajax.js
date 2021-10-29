
        $(document).ready(function(){
            $("#form").submit(function (e) {
                e.preventDefault();

                $("#status").html("Uploading...");
                //$("#loader").show();

                setTimeout(() => {
                    for(let i = 0; i < $("#fileMultiple")[0].files.length; ++i){

                        let fd =  new FormData();
                        fd.append("fileMultiple", $("#fileMultiple")[0].files[i]);

                        console.log($("#fileMultiple")[0].files[i]);
                        $.ajax({
                            type: "POST",
                            url: "/multiapi",
                            processData: false,
                            contentType: false,
                            data :fd,

                            xhr: function () {
                                var myXhr = $.ajaxSettings.xhr();
                                console.log("myXhr ===============> ");
                                console.log(myXhr);

                                $(".upload-status").append("<div class=\"file-upload-status\">File - " + $("#fileMultiple")[0].files[i].name + " => Status : <input type=\"range\" id=\"" + i + "\" min=\"0\" max=\"100\" value=\"\" step=\"50\" /> <span id=\"span"+i+"\"></span> % </div><br>");

                                if (myXhr.upload) {
                                    myXhr.upload.addEventListener('progress', function (event) {
                                        //progressHandling(fileIndex, event);
                                            var percent = 0;
                                            var position = event.loaded || event.position;
                                            var total = event.total;
                                            if (event.lengthComputable) {
                                                percent = Math.ceil(position / total * 100);
                                            }
                                            // update progressbars classes so it fits your code
                                            //$("#statusUpload").html(percent + "%");
                                            $("#span"+i).html(percent);
                                            console.log(percent, "for ", $("#fileMultiple")[0].files[i].name);
                                            $("input#"+i).attr("value", percent.toString());
                                            //$("#progressbar" + inx).attr("aria-valuenow", +percent + "%");
                                            //if (percent == 100) {
                                            //    $("#progressbar" + inx).attr("class", "progress-bar progress-bar-success");
                                            //}
                                            //$("#uploadPercentage" + inx).text(percent + "%");
                                    }, false);
                                }
                                return myXhr;
                            },
                            
                            success: function(res){
                                //$("span#"+i).html("");
                                $("#status").html(res);
                                $("span#" + i).parent().html(res);
                                //$("#loader").hide();
                            },
                            error: function (err) {
                                console.log(err);
                                $("#status").html("An Error was occured in uploading...");
                            }
                        });    
                    }
                } ,1000);


            });
        });
