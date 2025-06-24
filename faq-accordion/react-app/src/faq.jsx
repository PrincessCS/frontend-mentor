import {useState, useEffect} from "react";
import starIcon from './assets/images/icon-star.svg';
import showIcon from './assets/images/icon-plus.svg';
import hideIcon from './assets/images/icon-minus.svg';

function FAQ(){
    const [faqs, setFaqs] = useState([]);
    const [isOpen, setIsOpen] = useState(null);

    useEffect(() => {
        fetch('/faq.json')
        .then(response => response.json())
        .then(data => setFaqs(data))
        .catch(err => console.error('Error loading data', err))
    }, []);

    const toggleFaq = (index) => {
        setIsOpen(prev => (prev === index ? null : index))
    }
    return(
        <>
         <section className="faq-container">
            <div className="faq-header">
                <img src={starIcon} alt="star-icon"/><h1>FAQs</h1>
            </div>
            {faqs.map((faq, index) => (
                <article key={index}>
                    <div 
                      className="faq-question"
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleFaq(index)}
                      onKeyDown={(e)=>{
                        if(e.key === 'Enter' || e.key === ' '){
                            toggleFaq(index)
                        }  
                      }}
                      aria-expanded={isOpen === index}
                      aria-controls={`faq-answer-${index}`}
                      aria-label={`Toggle answer for: ${faq.question}`}>
                     <h2>{faq.question}</h2>
                     <img src={isOpen === index ? hideIcon : showIcon} 
                      alt={isOpen === index  ? 'Hide Answer' : 'Show Answer'} 
                      className={`toggle-icon ${isOpen === index ? 'open' : ''}`}/>
                    </div>

                    <div 
                     className={`faq-body ${isOpen === index ? 'open' : ''}`}
                     id={`faq-answer-${index}`}>
                        <p>{faq.answer}</p>
                    </div>
                </article>
            ))}
        </section>
        </>
    );
}

export default FAQ;