//import transaction model 
const Transaction = require('../../model/transaction');
const User = require('../../model/user');
const Course = require('../../model/course');


const stripe = require('stripe')('sk_test_51NNWBPSFUA5biWpWDvjffbINv3VBHgMHnGFAIosGYwWUV0VoHf2xojsKC0Nt9ehMjeYv9zwtwRCYoXvmtTFkzwOJ00VhZSA5Qz');

module.exports.payment = async function(req, res){

    console.log('Processing Payment ');
    console.log(req.body);
    const {
        id,
        userEmail,
        userId,
        userName,
        amount,
        courses,
    } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount, // amount in smallest currency unit (e.g. cents)
    currency: 'usd', // or your preferred currency
    receipt_email: userEmail,
    payment_method_types: ['card'],
  });

  //create transaction in database
  try {
     const transaction = await Transaction.create({
    transaction_id: id,
    user_id: userId,
    username: userName,
    userEmail: userEmail,
    courses: courses,
    transaction_made: amount,
  });

  //update user's courses
  const updatedUser = await User.findByIdAndUpdate(userId, 
      { $push: { enrolledCourses: courses } },
      { new: true }
  );
  
  //update user's courses
  for(let i = 0; i < courses.length; i++){
      const updatedCourse = await Course.findByIdAndUpdate(courses[i], 
        { $addToSet: { students: userId } },
        { new: true }
      );
    }  


   res.json({ clientSecret: paymentIntent.client_secret });   
  } catch (error) {
    console.log(error);
    res.json({ error: 'Error creating transaction' });

  }
 

}

module.exports.getTransactionsDetails = async function(req, res){

  const id = req.params.id;

  try{
    const transactions = await Transaction.find({ user_id: id }).populate('courses');
    res.status(200).json(transactions);
  }catch(error){
    console.log(error);
    res.status(500).json({ error: 'Error getting transactions' });
  }

}

module.exports.adminGetTransactionsDetails = async function(req, res){
  const transactions = await Transaction.find({}).populate('courses');
  console.log(transactions);
  return res.render('viewtransactions', {
    title: 'Transactions',
    transactions: transactions
  });

}

