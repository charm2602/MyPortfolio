<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = htmlspecialchars($_POST['fname']);
    $lname = htmlspecialchars($_POST['lname']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'vcharm26@gmail.com'; 
        $mail->Password   = 'vjfp vrba niye vzxv'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587; 

        //Recipients
        $mail->setFrom($email, $fname . ' ' . $lname);
        $mail->addAddress('vcharm26@gmail.com'); 

        // Content
        $mail->isHTML(false);
        $mail->Subject = "New Message from $fname $lname";
        $mail->Body    = "Good day, Charm!\n\nYou received a message from $fname $lname. Here are the details: \n\nEmail: $email\nMessage: $message";

        $mail->send();
        echo "<p>Email successfully sent!</p>";
    } catch (Exception $e) {
        echo "<p>Email sending failed: {$mail->ErrorInfo}</p>";
    }
} else {
    echo "<p>Invalid request.</p>";
}
?>