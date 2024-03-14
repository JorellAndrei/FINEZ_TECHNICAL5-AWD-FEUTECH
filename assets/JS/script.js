//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function() {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 800,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function() {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 800,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function() {
    return false;
})


// Sticky Header
$(window).scroll(function() {

    if ($(window).scrollTop() > 100) {
        $('.main_h').addClass('sticky');
    } else {
        $('.main_h').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.main_h').removeClass('open-nav');
    } else {
        $('.main_h').addClass('open-nav');
    }
});

$('.main_h li a').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_h').removeClass('open-nav');
    }
});

// Navigation Scroll - ljepo radi materem
$('nav a').click(function(event) {
    var id = $(this).attr("href");
    var offset = 70;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
        scrollTop: target
    }, 500);
    event.preventDefault();
});


document.addEventListener("DOMContentLoaded", function() {
    // Selecting input fields
    const dumplingsInput = document.getElementById("dumplings");
    const hainaneseInput = document.getElementById("hainanese");
    const laksaInput = document.getElementById("laksa");
    const asianChickenInput = document.getElementById("asian_chicken");
    const cracklingPorkInput = document.getElementById("crackling_pork");
    const pandaCoolersInput = document.getElementById("panda_coolers");
    const totalBillInput = document.getElementById("total_bill");
    const totalCashInput = document.getElementById("total_cash");
    const calculateTotalButton = document.getElementById("calculate_total");
    const proceedButton = document.getElementById("proceed_button"); // Assuming this is the button to proceed to customer info

    $(document).ready(function() {
        // Calculate and display total quantity on input change
        $(".food-item").on("input", function() {
            var totalQuantity = 0;
            $(".food-item").each(function() {
                var quantity = parseFloat($(this).val()) || 0;
                totalQuantity += quantity;
            });
            $("#total-quantity-label").text(totalQuantity);
        });

        // Function to calculate total bill
        function calculateTotalBill() {
            const dumplings = parseInt($("#dumplings").val()) || 0;
            const hainanese = parseInt($("#hainanese").val()) || 0;
            const laksa = parseInt($("#laksa").val()) || 0;
            const asianChicken = parseInt($("#asian_chicken").val()) || 0;
            const cracklingPork = parseInt($("#crackling_pork").val()) || 0;
            const pandaCoolers = parseInt($("#panda_coolers").val()) || 0;

            // Calculate subtotal
            const subtotal = (dumplings * 64) + (hainanese * 84) + (laksa * 152) +
                (asianChicken * 136) + (cracklingPork * 144) + (pandaCoolers * 44);

            // Display subtotal
            $("#total_bill").val(subtotal.toFixed(2));
        }

        // Event listener for the calculate total button
        $("#calculate").click(function() {
            calculateTotalBill();
            // Optionally, you can show the next button after calculation
            $(".next.action-button").show();
        });

        // Optional: You can also calculate the total bill whenever any input field changes
        $(".food-item").change(function() {
            calculateTotalBill();
        });

        // Optional: Validation function to check if total cash is higher or equal to total bill
        function validateTotalCash() {
            const totalBill = parseFloat($("#total_bill").val());
            const totalCash = parseFloat($("#total_cash").val());

            if (totalCash >= totalBill) {
                // Allow proceeding to customer info
                return true;
            } else {
                // Display error message or handle accordingly
                alert("Total cash should be higher or equal to the total bill.");
                return false;
            }
        }
    });


    // Event listener for the proceed button to validate total cash before proceeding
    proceedButton.addEventListener("click", function(event) {
        if (!validateTotalCash()) {
            event.preventDefault(); // Prevent default action (i.e., proceeding to customer info)
        }
    });
});

$(document).ready(function() {
    // Calculate total bill
    $("#calculate_total").click(function() {
        var total = 0;
        $("input[type='number']").each(function() {
            var price = parseFloat($(this).val()) || 0;
            total += price;
        });
        $("#total_bill").val(total.toFixed(2));
        // Move to next step
        $(".next").click();
    });

    // Submit form and display sales invoice
    $(".submit").click(function() {
        var name = $("input[name='name']").val();
        var address = $("input[name='address']").val();
        var contact = $("input[name='contact_number']").val();
        var totalBill = $("#total_bill").val();
        var totalCash = $("#total_cash").val();
        var change = totalCash - totalBill;

        // Display sales invoice
        $("#invoice_name").text(name);
        $("#invoice_address").text(address);
        $("#invoice_contact").text(contact);
        $("#invoice_total_bill").text(totalBill);
        $("#invoice_total_cash").text(totalCash);
        $("#invoice_change").text(change);

        // Move to next step
        $(".next").click();
    });
});

$(document).ready(function() {


    // Function to calculate total bill
    function calculateTotalBill() {
        let total = 0;
        $(".food-item").each(function() {
            const price = parseFloat($(this).val()) || 0;
            total += price;
        });
        $("#total_bill").val(total.toFixed(2));
    }

    // Event listener for the calculate total button
    $("#calculate").click(function() {
        calculateTotalBill();
    });

    // Optional: You can also calculate the total bill whenever any input field changes
    $(".food-item").change(function() {
        calculateTotalBill();
    });

    // Validation function to check if total cash is higher or equal to total bill
    function validateTotalCash() {
        const totalBill = parseFloat($("#total_bill").val());
        const totalCash = parseFloat($("#total_cash").val());

        if (totalCash >= totalBill) {
            // Proceed to customer info
            return true;
        } else {
            // Display error message
            alert("Total cash should be greater than or equal to the total bill.");
            return false;
        }
    }

    // Event listener for the next button
    $(".next.action-button").click(function() {
        // Validate total cash before proceeding
        const totalBill = parseFloat($("#total_bill").val());
        const totalCash = parseFloat($("#total_cash").val());
        if (totalCash < totalBill) {
            $("#error-message").text("Total cash should be greater than or equal to the total bill.");
            $("#error-modal").show();
            return false; // Prevent proceeding if validation fails
        }
    });

    // Calculate and display total quantity on input change
    $(".food-item").on("input", function() {
        let totalQuantity = 0;
        $(".food-item").each(function() {
            const quantity = parseFloat($(this).val()) || 0;
            totalQuantity += quantity;
        });
        $("#total-quantity-label").text(totalQuantity);
    });

    // Close the error modal when the user clicks anywhere outside of it
    $(window).click(function(event) {
        if (event.target === $("#error-modal")[0]) {
            $("#error-modal").hide();
        }
    });
});