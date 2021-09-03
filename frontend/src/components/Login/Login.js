export default function Login(props) {
	return (
		<div className='login_body'>
			<div className='box_login'>
				<h2>
					<b>Login</b>
				</h2>
				<form>
					<div className='inputbox_login'>
						<input type='text' name='' required='' />
						<label style={{ marginTop: "5px" }}>Username</label>
					</div>
					<div className='inputbox_login'>
						<input type='password' name='' required='' />
						<label style={{ marginTop: "5px" }}>Password</label>
					</div>
					<input type='submit' name='' value='Submit' />
				</form>
			</div>
		</div>
	);
}
