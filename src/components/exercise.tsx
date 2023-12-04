import React, { useState } from 'react';
import  abcjs from 'abcjs';
import { FileUpload } from './fileupload';
import ExerciseData from '../interfaces/exerciseData';


export function Exercise({ 
    setExerciseData,
    teacherMode,
    exerciseData
}: { 
    exerciseData: ExerciseData | undefined;
    setExerciseData: ((newData: ExerciseData) => void);
    teacherMode: boolean;
}) {
    var abc,ans,feed: string;
    abc = "";
    ans = "";
    feed = "";
    if(exerciseData != undefined && exerciseData.score != undefined && exerciseData.correctAnswer != undefined && exerciseData.feedback != undefined){
            abc = exerciseData.score;
            ans = exerciseData.correctAnswer;
            feed = exerciseData.feedback;
    }
    const [output, setOutput] = useState<string>();
    const [selectedAnswer, setSelectedAnswer] = useState<string>();
    const [correctAnswer, setCorrectAnswer] = useState<string>(ans);
    const [itemList, setItemList] = useState<JSX.Element[]>();
    
    const [abcFile, setAbcFile] = useState<string>(abc);
    const [ana, setAna] = useState<string>();

    const clickListener = function (abclem:object, tuneNumber: number,classes:string, analysis:abcjs.ClickListenerAnalysis, drag:abcjs.ClickListenerDrag){
    
        var op = JSON.stringify(drag.index);
        setOutput(op);
        setAna(JSON.stringify(drag.index));
        var test = document.querySelector(".clicked-info");
        if(test !== null) {test.innerHTML = "<div class='label'>Clicked info:</div>" + op;}
    }
    
    const loadScore = function() {
        // sample file: "X:1\nZ:Copyright ©\n%%scale 0.83\n%%pagewidth 21.59cm\n%%leftmargin 1.49cm\n%%rightmargin 1.49cm\n%%score [ 1 2 ] 3\nL:1/4\nQ:1/4=60\nM:4/4\nI:linebreak $\nK:Amin\nV:1 treble nm=Flute snm=Fl.\nV:2 treble transpose=-9 nm=Alto Saxophone snm=Alto Sax.\nV:3 bass nm=Violoncello snm= Vc.\nV:1\nc2 G3/2 _B/ | _A/_B/ c _d f | _e _d c2 |] %3\nV:2\n[K:F#min] =c d c3/2 e/ | =f f/e/ d2 | =f e f2 |] %3\nV:3\n_A,,2 _E,,2 | F,,2 _D,,2 | _E,,2 _A,,2 |] %3"
        var abcString = abcFile;
        var el = document.getElementById("target");
        if(el !== null && abcString !== undefined){abcjs.renderAbc(el,abcString,{ clickListener: clickListener, selectTypes: ["note"]});}
    }
    const save = function(){
        if(abcFile !== undefined && selectedAnswer !== undefined){
            let data = new ExerciseData(abcFile, selectedAnswer, "");
            setExerciseData(data);
        }
            
    }

    const selectAnswer = function() {
        if(output !== undefined && selectedAnswer !== output) {
            const newSelected = (output);
            setSelectedAnswer(newSelected);
        }else{
            setSelectedAnswer('');
        }
    }

    return (
        <div>
            {teacherMode==true?
            <span>
                <FileUpload setAbcFile={setAbcFile}></FileUpload>
                <button onClick={loadScore}>Load Score</button>
                <div id ="target"></div>
                <div className="clicked-info"></div>
                <div>Analysis: {ana}</div>
                <button onClick={selectAnswer}>Select Answer</button>
                <div>Currently selected answer:</div>
                <ul>
                    <li>{selectedAnswer}</li>
                </ul>
                <button onClick={save}>Save</button>
                
            </span>
            :
            <span>
            <button onClick={loadScore}>Load Score</button>
            <div id ="target"></div>
            <div className="clicked-info"></div>
            <div>Analysis: {ana}</div>
            <button onClick={selectAnswer}>Check Answer</button>
            {selectedAnswer !== undefined ? (
                selectedAnswer == correctAnswer ? 
                    <div>Correct!</div>
                    :
                    <div>Incorrect </div>) : 
                <div>Select an Answer</div>
            }
            
            </span>
            }
            
        </div>

    );
}