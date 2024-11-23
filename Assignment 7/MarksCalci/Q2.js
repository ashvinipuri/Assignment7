
'use strict'

$(document).ready(function () {
    // Allow only numeric inputs
    $("#phyMarks, #chemMarks, #mathmarks").on("input", function () {
        const input = $(this).val();
        const regex = /^\d*\.?\d*$/;

        if (!regex.test(input)) {
            $(this).val(input.slice(0, -1));
        }
    });

    // Handle button click
    $("button").click(function () {
        const data1 = parseInt($("#phyMarks").val());
        const data2 = parseInt($("#chemMarks").val());
        const data3 = parseInt($("#mathmarks").val());

        // Input validation
        if (isNaN(data1) || isNaN(data2) || isNaN(data3)) {
            $("#p").html("Please enter valid marks for all subjects!").css("color", "red");
            return;
        }

        if (data1 < 0 || data2 < 0 || data3 < 0) {
            $("#p").html("Marks must be positive values!").css("color", "red");
            return;
        }

        $("#p").html(""); // Clear previous error messages

        // Calculate total and percentage
        const total = data1 + data2 + data3;
        const percentage = Math.round((total / 300) * 100);

        $("#total-marks").html(total);
        $("#p2").html(percentage + "%");

        // Determine grade
        let grade;
        if (percentage > 75) {
            grade = "First class with distinction";
        } else if (percentage > 60) {
            grade = "First class";
        } else if (percentage > 50) {
            grade = "Second class";
        } else {
            grade = "Fail";
        }
        $("#p3").html(grade);

        // Render pie chart
        Highcharts.chart("container", {
            chart: { type: "pie" },
            title: { text: "PCM Marks Distribution" },
            series: [
                {
                    name: "Marks",
                    colorByPoint: true,
                    data: [
                        { name: "Physics", y: data1 },
                        { name: "Chemistry", y: data2 },
                        { name: "Mathematics", y: data3 },
                    ],
                },
            ],
        });
    });
});