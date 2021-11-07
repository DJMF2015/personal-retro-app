import Link from 'next/link';

const AccessDenied = () => {
	return (
		<>
		  <p>Access Denied</p>
	  
		  <button>
		    <Link href='/'>Click here to login</Link>
		  </button>
		</>
	      );
}

export default AccessDenied;