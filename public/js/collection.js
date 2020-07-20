const submitBtn = document.querySelector(`#submitBtn`);
const newLogBtn = document.querySelectorAll("#newLogBtn");

$(document).ready(function () {

    $("#logForm").on("submit", (e) => {
        e.preventDefault();
        let pokemon = $("#nameInput").val();
        $("#nameInput").val("");
        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/ `,
            datatype: "JSON",
        }).then((response) => {
            console.log(response);
            //Name

            createLog(response.name, response.sprites.front_default, response.types[0].type.name)
                .then(() => renderLogs());


            //Type
            //console.log(response.types[0].type.name);
            // pokeType.textContent = `Type: ${response.types[0].type.name}`;
            //Image
            // pokeImage.src = response.sprites.front_default;
        });

    });

    const createLog = (name, image, type) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/logs/new",
                data: {
                    name: name,
                    image: image,
                    type: type,
                },
            }).then((res) => {
                console.log(res);
                $("#nameInput").val("");
                logInstance.close();
                resolve("success");
            });
        });
    };

    const renderLogs = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "/logs/user",
            }).then((logs) => {
                console.log(logs);
                $("#recent-cards").empty();
                logs.forEach((log) => {
                    let { name, image, type } = log;
                    if (name) {
                        name = `<p>${name}</p>`;
                    } else {
                        name = "";
                    }
                    console.log(name);


                    $("#recent-cards").append(`
            <div class="card col s12 m12 l3 valign-wrapper" style="margin-left: 3% ;margin-right: 3% height: 400px;" >
              <div class="col card-image waves-effect waves-block waves-light">
                <img class="activator" src="${image}">
              </div>
              <div class="card-content center-align">
                <span class="card-title activator grey-text text-darken-4 center">${name}<i class="material-icons right">more_vert</i></span>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${name}<i class="material-icons right">close</i></span>
                <p>Type: ${type}</p>
                <p>Filler</p>
              </div>
            </div>
                  `)
                });
                resolve("success");
            });
        });
    };

    $(".parallax").parallax();
    $(".sidenav").sidenav();

    const logModal = document.getElementById("newLogModal");
    const logInstance = M.Modal.init(logModal, { dismissible: true });

    renderLogs();

    $(newLogBtn).on("click", () => {
        console.log("before");
        logInstance.open();
    });
    $("#logCancel").on("click", () => logInstance.close());


});