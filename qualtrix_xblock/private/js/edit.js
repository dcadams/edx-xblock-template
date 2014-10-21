function QualtrixXblockEdit(runtime, element) {
    'use strict';

    var $ = window.$;
    var $element = $(element);
    var buttonSave = $element.find('.save-button');
    var buttonCancel = $element.find('.cancel-button');
    var url = runtime.handlerUrl(element, 'studio_view_post');

    buttonCancel.on('click', function () {
        runtime.notify('cancel', {});
        return false;
    });

    buttonSave.on('click', function () {
        runtime.notify('save', {
            message: 'Saving...',
            state: 'start'
        });
        $.ajax(url, {
            type: 'POST',
            data: JSON.stringify({
                'xblock_qualtrix_xblock_name':
                    $('#xblock_qualtrix_xblock_name').val(),
                'xblock_qualtrix_xblock_survey_id':
                	$('#xblock_qualtrix_xblock_survey_id').val(),
                'xblock_qualtrix_xblock_your_university':
                	$('#xblock_qualtrix_xblock_your_university').val(),
                'xblock_qualtrix_xblock_link_text':
                	$('#xblock_qualtrix_xblock_link_text').val()
            }),
            success: function buttonSaveOnSuccess() {
                runtime.notify('save', {
                    state: 'end'
                });
            },
            error: function buttonSaveOnError() {
                runtime.notify('error', {});
            }
        });
        return false;
    });
    
    $('#display-source').click(function(e) {
    	e.preventDefault();
    	$('#content-source').toggle();
    });
    
}
