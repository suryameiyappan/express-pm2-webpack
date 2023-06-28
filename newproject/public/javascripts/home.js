const homeFunction = () => {
  $("#clickId").click(function () {
    let data;
    data = $("#english").val();
    var url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=" +
      data;
    $.ajax({
      url: url,
      type: "GET",
      data: data,
      success: (response) => {
        $("#tamil").append(response[0]?.[0]?.[0]);
      },
      error: (error) => {
        console.log(`Error ${error}`);
      },
    });
  });

  $("#clickClear").click(function () {
    $("#english").append("");
    $("#tamil").append("");
  });

  $("#form").on("submit", function (e) {
    e.preventDefault();
    var url = "/api/file-upload";
    $.ajax({
      url: url,
      type: "POST",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: (response) => {
        $("#response").append(response.message);
        $("#myImage").attr("src", "/uploads/" + response.file);
      },
      error: (error) => {
        console.log(`Error ${error}`);
      },
    });
  });
};

export { homeFunction };
