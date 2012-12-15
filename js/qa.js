var console = console || {log: function(){}};

var QuestionAnswer = function(){
    var _step = -1;
    var _questions = [];
    _block_ui = false;
    
    var QA = {
        init: function(questions){
            _questions = questions;
            step = -1;
            _block_ui = false;
            $('form').submit(function(event){
                if(!_block){
                    if(is_answer_correct()){
                        good_answer();
                    }else{
                        bad_answer();
                    }
                }
                event.stopPropagation();
                return false;
            });
            next_step();
        }
    };
    
    var is_answer_correct = function(){
        return $('#answer').val().toLowerCase() == _questions[step].answer.toLowerCase();
    };
    
    var next_step = function(){
        step++;
        unblock_ui();
        $('#answer').val('');
        if(step >=_questions.length){
            window.location.href='finish.html';
        }else{
            render_question(_questions[step].question, true);
        }
        
    };
    
    
    var render_question = function(question, type){
        $('#cloud_dragon').html(question);
        if(type){
            $('#cloud_dragon').typewrite();
        }
    };
    
    var good_answer = function(){
        render_response('Good!');
        block_ui();
        setTimeout(function(){
            next_step();
        },3000);
    };
    
    var bad_answer = function(){
        render_response('Bad!');
        setTimeout(function(){
            render_question(_questions[step].question);
        },3000);
    };
    
    var render_response = function(response){
        $('#cloud_dragon').html(response);
    };
    
    var block_ui = function(){
        _block = true;
    };
    
    var unblock_ui = function(){
        _block = false;
    }
    
    return QA;
    
};