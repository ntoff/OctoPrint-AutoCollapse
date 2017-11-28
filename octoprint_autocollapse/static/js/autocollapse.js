/*
 * View model for OctoPrint-AutoCollapse
 *
 * Author: ntoff
 * License: AGPLv3
 */
$(function() {
    function AutocollapseViewModel(parameters) {
        var self = this;
        'use strict';
        self.settings = parameters[0];
        //self.state = parameters[1];

        function collapseFiles(timeout) {
            var timeout = timeout;
                self.timerCollapse = setTimeout(function() {
                    if (!$("#files_wrapper .accordion-toggle").hasClass("collapsed")){
                        $("#files_wrapper .accordion-toggle").click();
                    }
                }, timeout*1000);
        }

        function expandFiles() {
            if ($("#files_wrapper .accordion-toggle").hasClass("collapsed")){
                $("#files_wrapper .accordion-toggle").click();
            }
        }
        
        $("#files_wrapper").mouseenter(function() {
            clearTimeout(self.timerCollapse);
            expandFiles();
        })

        $("#files_wrapper").mouseleave(function() {
            var leaveTimeout = parseInt(self.settings.settings.plugins.autocollapse.mouseOutTimeout());
            if (leaveTimeout == 0) {leaveTimeout = 0.5} //a small fudge factor is necessary to circumvent a certain condition where if you mouse over and mouse out very fast, the accordion becomes stuck in a weird state.
            collapseFiles(leaveTimeout);
        })

        self.onBeforeBinding = function () {
            var timeout = parseInt(self.settings.settings.plugins.autocollapse.initialTimeout());
            if (timeout == 0) { 
                console.log("Files accordion auto collapse is disabled.");
                return 
            } else {
                collapseFiles(timeout);
            }
        }

        self.onSettingsHidden = function () {
            var leaveTimeout = parseInt(self.settings.settings.plugins.autocollapse.mouseOutTimeout());
            var timeout = parseInt(self.settings.settings.plugins.autocollapse.initialTimeout());
        }
        
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: AutocollapseViewModel,
        dependencies: [ "settingsViewModel"/*, "printerStateViewModel" */],
        elements: [ /* ... */ ]
    });
});
