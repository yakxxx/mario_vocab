var console = console || {log: function(){}};

var QuestionAnswer = function(){
    var _step = -1;
    var _questions = [];
    
    var QA = {
        init: function(questions){
            _questions = questions;
            step = -1;
            $('form').submit(function(event){
               event.stopPropagation();
               if(is_answer_correct()){
                   good_answer();
               }else{
                   bad_answer();
               }
               
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
        $('#answer').val('');
        if(step >=_questions.length){
            window.location.href='finish.html';
        }else{
            render_question(_questions[step].question);
        }
    };
    
    
    var render_question = function(question){
        $('#cloud_dragon').html(question);
        $('#cloud_dragon').typewrite();
    };
    
    var good_answer = function(){
        render_response('Good!');
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
    
    return QA;
    
};