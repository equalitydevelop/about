$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});

window.addEventListener("DOMContentLoaded", function() {    
    var form = document.getElementById("contactForm");
    var button = document.getElementById("sendMessageButton");
    var status = document.getElementById("my-form-status");
    
    function success() {
        $("#success").html("<div class='alert alert-success'>");
        $("#success > .alert-success")
            .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
        $("#success > .alert-success").append(
            "<strong>Your message has been sent. </strong>"
        );
        $("#success > .alert-success").append("</div>");
        //clear all fields
        $("#contactForm").trigger("reset");
    }

    function error() {
        $("#success").html("<div class='alert alert-danger'>");
        $("#success > .alert-danger")
            .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
        $("#success > .alert-danger").append(
            $("<strong>").text(
                "Sorry " +
                form.elements[0].value +
                    ", you have to fill in all the fields. Please try again!"
            )
        );
        $("#success > .alert-danger").append("</div>");
        //clear all fields
        $("#contactForm").trigger("reset");
    }

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();

        var data = {
            name: form.elements[0].value,
            email: form.elements[1].value,
            phone: form.elements[2].value,
            message: form.elements[3].value,
        };
        const isEmpty = Object.values(data).some(x => (x === null || x === ''));
        if(isEmpty)
         data = {};
        var myJSON = JSON.stringify(data);

      ajax(form.method, form.action, myJSON, success, error);
    });
  });
  


  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }