import React,{useState} from 'react';
import DashboardHeader from '../Dashboard/DashboardHeader';
import Sidebar from '../Dashboard/Sidebar';
import { Button, Form, Row, Col, Container,Modal  } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const JobsSearch = () => {
    const [searchTerms, setSearchTerms] = useState('');
    const [location, setLocation] = useState('');
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const urlLinkedIN  = 'https://linkedin-jobs-search.p.rapidapi.com/';

  
    async function getJobs(options){
        const result = await axios.request(options);
        return result.data;
    }
 
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(`Search terms: ${searchTerms}, Location: ${location}`);
        // Here you could handle your form submit, e.g., make a search API call
        const options = {
            method: 'POST',
            url: 'https://linkedin-jobs-search.p.rapidapi.com/',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.REACT_APP_JOB_API_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
            },
            data: {
                search_terms: searchTerms,
                location: location,
                page: '1'
            }
        };
        try {
             const letResult = await getJobs(options); 
                if(letResult){
                    console.log(letResult);
                    setJobs(letResult);

                }     
        } catch (error) {
            console.log(error);
            setJobs([]);
        }
    };
    //show job modals
    const handleShow = (job)=>{
        setSelectedJob(job);
        setShowModal(true);
    }
    //close modals
    const handleClose = ()=>{
        setSelectedJob(null);
        setShowModal(false);
    }
    
    return (
        <>
      
        <DashboardHeader />
    <div class="container-fluid">
        <div class="row">
            <Sidebar />
             <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5">
                <p className='h4'> Find your Jobs </p>
                
                <Form onSubmit={handleSubmit}>
                    <Container>
                        <Row className="align-items-center">
                        <Col>
                            <Form.Group className="mb-3" controlId="searchTerms">
                            <Form.Label>Search Terms</Form.Label>
                            <Form.Control
                                type="text"
                                value={searchTerms}
                                onChange={e => setSearchTerms(e.target.value)}
                            />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" className="mt-3" onClick={handleSubmit}>Search</Button>
                        </Col>
                        </Row>
                    </Container>
                </Form>
                <hr />
                <div className="row">
                    
               { jobs.length > 0 ? (
               
               jobs.map((job, index) => (

                 <div className="col-md-4" key={index}>
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={'https://placehold.co/400'} className="card-img-top"  />
                        <div className="card-body">
                            <h5 className="card-title">{job.company_name} </h5>
                            <p>{job.job_title}</p>
                            <NavLink to={job.job_url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Apply For Job</NavLink> &nbsp;
                            <button className='btn btn-warning' onClick={() => handleShow(job)}>View Details</button>
                        </div>
                    </div>
                </div>

                ))
               ) : (
                <p>No relevant job found</p>
               )}
               </div>



             </main>
           
        </div>
    </div>
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedJob?.company_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{selectedJob?.job_title}</h5>
        
        <p>Location : {selectedJob?.job_location}</p>
        <p>Posted Date: {selectedJob?.posted_date}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
        </>
        
    );
}

export default JobsSearch;
