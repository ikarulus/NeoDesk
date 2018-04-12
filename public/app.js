/**
 * @desc        app globals
 */
define([
    "jquery",
    "underscore",
    "backbone"
],
    function ($, _, Backbone) {

        var app = {
            root: "/",                     // The root path to run the application through.
            URL: "/",                      // Base application URL
            API: "",                   // Base API URL (used by models & collections)

            // Show alert classes and hide after specified timeout
            showAlert: function (text, klass) {
                $("#header-alert").removeClass("alert-danger alert-warning alert-success alert-info");
                $("#header-alert").addClass(klass);
                $("#header-alert").html(
                    '<button type="button" class="close" data-dismiss="alert">&times;</button><p class="mb-0">' + text + '</p>');
                $("#header-alert").show();
                setTimeout(function () {
                    $("#header-alert").hide();
                }, 3000);
            },
            // TODO: Create module for this...
            timeAgo: function (timestamp) {
                var date = new Date(timestamp);
                return date.toDateString();
            }
        };

        $.ajaxSetup({ cache: false });          // force ajax call on all browsers


        // Global event aggregator
        app.eventAggregator = _.extend({}, Backbone.Events);

        // View.close() event for garbage collection
        Backbone.View.prototype.close = function () {
            this.remove();
            this.unbind();
            if (this.onClose) {
                this.onClose();
            }
        };

        return app;

    });
