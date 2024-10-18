import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import DNS_NAME from './dnsname';

const Questions = () => {
    const [result, setresult] = useState(false);
    const [question, setQuestion] = useState([]);
    const [next, setnext] = useState(0);
    const [lock, setlock] = useState(false);
    const [wrong, setwrong] = useState("bg-[#EC8944]");
    const [name,setName] = useState("");
    const [loader,setloader]=useState(false)

   
    const [answers, setAnswers] = useState(0); // Store answer results as boolean (true for correct, false for wrong)

    const { id } = useParams();

    const option11 = useRef(null)
    const option12 = useRef(null)
    const option13 = useRef(null)
    const option14 = useRef(null)
   
    let option_array = [option11,option12,option13,option14]
    // Function to check the answer
    function checkans(e,ans) {
        if (lock === false) {
            if (question[next]?.answer == ans) {
                e.target.classList.add("bg-green-600")
                setlock(true);
                setAnswers(prev=>prev+1)
            } else {
                e.target.classList.add("bg-red-600")
                option_array[question[next]?.answer-1]?.current.classList.add("bg-green-600","scale","shake")
                setlock(true);
            }
        }
    }

   

    // Reset the state when moving to the next question
    const handlenext = () => {
        if(lock===true){
            if (next < question.length - 1) {
                setnext((prev) => prev + 1);
            }
            setlock(false)
            option_array.map((e)=>{e.current?.classList.remove("bg-red-600","scale","shake")})
            option_array.map((e)=>{e.current?.classList.remove("bg-green-600")})
            return null
        }
    };

    // const handleprev = () => {
    //     if (next > 0) {
    //         setnext((prev) => prev - 1);
    //     }
    // };

    const fetchQuestions = async () => {
        try {
            setloader(true)
            const response = await axios.get(`${DNS_NAME}/student/student/question`);
            const filtereddata = response.data.filter((e) => e.categoryid === id);
            setloader(false)
            setQuestion(filtereddata);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

    const navigate = useNavigate();
    const handlereload = () => {
        const result = confirm("Are You Sure?");
        if (result) {
            navigate(-1);
        }
    };

    useEffect(() => {
        fetchQuestions();
        const storedValues = sessionStorage.getItem('name');

        if (storedValues) {
          // Parse the stored values
          const parsedValues = JSON.parse(storedValues);
          // Access the 'name' value and update the state
          setName(parsedValues.name);
        } else {
          // No need to set a default value here since we handle that in the form
          setName(""); // Explicitly set to empty string for clarity
        }
    }, []);

    return (
        <div>
            {result ? (
                <div className='absolute z-10 bg-slate-500 bg-opacity-50 h-screen w-full flex items-center justify-center'>
                    <div className='bg-[rgb(249,229,205)] w-fit sm:w-96 mx-auto rounded-xl p-4'>
                        <div className='p-3 md:p-12 lg:p-12'>
                            <div className='pb-5 text-center'>
                                <h1 className='font-bold my-4 text-center'>Your Score</h1>
                                <span className='my-4 text-4xl'>{answers}/{question.length}</span><br />
                                <span className='my-4 text-4xl'>{answers < question.length/2 ? "Good":answers < question.length-10?"Excellent":"Study Well"} {name}</span>
                                <div className='flex justify-center'>
                                    <Link to={"/"} className='mt-4 text-center bg-[rgb(236,137,68)] text-white p-4 rounded-lg'>Ok</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : ("")}
            <Navbar />
           {
            !loader?( <div className='bg-white m-2 sm:m-10 rounded-3xl p-3 sm:p-10'>
                <div className='text-right'>
                <span className='text-lg font-bold text-[#652A01]'>{next + 1} / {question.length} </span>
                </div>
                    <span className='text-lg font-bold text-[#652A01]'>Question No: {next + 1}</span>
      
                    <h1 className='text-2xl font-bold text-[#652A01] m-6'>{question[next]?.question}</h1>
    
                    {/* Option 1 */}
                    <div ref={option11} className={`p-4 rounded-3xl m-4 text-white text-10 sm:text-xl flex justify-between ${wrong}`} onClick={(e) => { checkans(e,1) }}>
                        {question[next]?.option1}
                    </div>
                    {/* Option 2 */}
                    <div ref={option12} className={`p-4 rounded-3xl m-4 text-white text-10 sm:text-xl flex justify-between ${wrong}`} onClick={(e) => { checkans(e,2) }}>
                        {question[next]?.option2}
                    </div>
    
                    {/* Option 3 */}
                    <div ref={option13} className={`p-4 rounded-3xl m-4 text-white text-10 sm:text-xl flex justify-between ${ wrong}`} onClick={(e) => { checkans(e,3) }}>
                        {question[next]?.option3}
                    </div>
    
                    {/* Option 4 */}
                    <div ref={option14} className={`p-4 rounded-3xl m-4 text-white text-10 sm:text-xl flex justify-between ${wrong}`} onClick={(e) => { checkans(e,4) }}>
                        {question[next]?.option4}
                    </div>
    
                    {/* Navigation Buttons */}
                    <div className='flex gap-4 items-center justify-center my-12'>
                        {next === 0 ? (<div><div onClick={handlereload} className='bg-[#652A01] text-white p-3 rounded-2xl text-xl cursor-pointer'>Sections</div></div>) : ("")}
    
                        {/* <span className='bg-[#652A01] text-white p-3 rounded-2xl cursor-pointer' onClick={handleprev} disabled={next === 0}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                                <path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z" />
                            </svg>
                        </span> */}
    
                        {next < question.length - 1 ? (
                            <span className='bg-[#652A01] text-white p-3 rounded-2xl cursor-pointer' onClick={handlenext}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                                    <path d="M673-446.67H160v-66.66h513l-240-240L480-800l320 320-320 320-47-46.67 240-240Z" />
                                </svg>
                            </span>
                        ) : (
                            <span className='bg-[#652A01] text-white p-3 rounded-2xl text-xl cursor-pointer' onClick={() => { setresult(true); }}>
                                Finish
                            </span>
                        )}
                    </div>
                </div>):(<div className='flex justify-center'>
                                    <span className="loader"></span>
                                </div>)
           }
        </div>
    );
}

export default Questions;
