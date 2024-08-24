let recruiters = [];
let jobs = [];
let messages = [];

document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const recruiterName = document.getElementById('name').value;
    const recruiterEmail = document.getElementById('email').value;
    const recruiterPassword = document.getElementById('password').value;

    const recruiter = {
        id: recruiters.length + 1,
        name: recruiterName,
        email: recruiterEmail,
        password: recruiterPassword,
        isApproved: false,
        jobsPosted: [],
        appliedJobs: []
    };

    recruiters.push(recruiter);
    alert('Recruiter account created! Waiting for admin approval.');
    console.log('Recruiters:', recruiters);
    this.reset();
});

// Admin approval code
document.getElementById('approve-btn')?.addEventListener('click', function() {
    const recruiterId = parseInt(document.getElementById('recruiter-id').value);
    const recruiter = recruiters.find(r => r.id === recruiterId);

    if (recruiter) {
        recruiter.isApproved = true;
        alert('Recruiter approved!');
        console.log('Approved Recruiter:', recruiter);
    } else {
        alert('Recruiter not found.');
    }
});

// code for recruiter login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const recruiter = recruiters.find(r => r.email === email && r.password === password);

    if (recruiter && recruiter.isApproved) {
        alert('Login successful!');
        // Redirect to Recruiter Dashboard (mock)
        window.location.href = 'recruiter-dashboard.html';
    } else if (recruiter && !recruiter.isApproved) {
        alert('Your account is not yet approved by the admin.');
    } else {
        alert('Invalid login credentials.');
    }
});

// Post a job code
document.getElementById('post-job-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const jobTitle = document.getElementById('title').value;
    const jobSalary = document.getElementById('salary').value;
    const jobDescription = document.getElementById('description').value;
    const jobExperience = document.getElementById('experience').value;
    const jobIncentive = document.getElementById('incentive').value;

    const job = {
        id: jobs.length + 1,
        title: jobTitle,
        salary: jobSalary,
        description: jobDescription,
        experience: jobExperience,
        incentive: jobIncentive,
        postedBy: recruiters.find(r => r.isApproved && r.email === document.getElementById('login-email')?.value),
        candidates: []
    };

    jobs.push(job);
    alert('Job posted successfully!');
    console.log('Jobs:', jobs);
    this.reset();
});

// Apply for a job code
document.querySelector('.apply-job-btn')?.addEventListener('click', function() {
    const jobId = parseInt(this.getAttribute('data-job-id'));
    const recruiterId = recruiters.find(r => r.email === document.getElementById('login-email')?.value).id;
    const job = jobs.find(j => j.id === jobId);

    if (job) {
        job.candidates.push(recruiterId);
        alert('Applied for the job successfully!');
        console.log('Job Application:', job);
    } else {
        alert('Job not found.');
    }
});

// Code for send message between recruiters
document.getElementById('message-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const recipientEmail = document.getElementById('recipient').value;
    const messageContent = document.getElementById('message-content').value;

    const recipient = recruiters.find(r => r.email === recipientEmail);
    const sender = recruiters.find(r => r.email === document.getElementById('login-email')?.value);

    if (recipient) {
        const message = {
            id: messages.length + 1,
            sender: sender.id,
            recipient: recipient.id,
            content: messageContent,
            timestamp: new Date()
        };

        messages.push(message);
        alert('Message sent successfully!');
        console.log('Messages:', messages);
        this.reset();
    } else {
        alert('Recipient not found.');
    }
});

// Distribute Incentive when an employee is hired code
function distributeIncentive(jobId) {
    const job = jobs.find(j => j.id === jobId);

    if (job && job.candidates.length > 0) {
        const incentive = parseFloat(job.incentive);
        const adminShare = (incentive * 20) / 100;
        const jobPosterShare = (incentive * 40) / 100;
        const recruiterShare = (incentive * 40) / 100;

        alert(`Incentive Distributed!\nAdmin: ${adminShare} PKR\nJob Poster: ${jobPosterShare} PKR\nRecruiter: ${recruiterShare} PKR`);
    } else {
        alert('No candidates applied for this job yet.');
    }
}

// Simulate incentive distribution (e.g., when a candidate is hired) code
document.getElementById('distribute-incentive-btn')?.addEventListener('click', function() {
    const jobId = parseInt(document.getElementById('job-id').value);
    distributeIncentive(jobId);
});
