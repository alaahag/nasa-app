import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	links: {
		marginRight: theme.spacing(2),
		color: 'white'
	},
	link_active: {
		display: 'flex',
		color: 'white',
		textDecoration: 'none',
		fontWeight: "bold"
	},
	link_inactive: {
		display: 'flex',
		color: '#c8c3c3',
		textDecoration: 'none',
		fontWeight: "normal"
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20
	}
}));

export default function Links() {
	const classes = useStyles(),
	location = useLocation();

	return (
		<Breadcrumbs separator="/" aria-label="breadcrumb" className={classes.links}>
			<Link to="/" className={location.pathname === '/' ? classes.link_active : classes.link_inactive}>
				<HomeIcon className={classes.icon} />
				Home
			</Link>
			<Link to="/favorites" className={location.pathname === '/favorites' ? classes.link_active : classes.link_inactive}>
				<FavoriteIcon className={classes.icon} />
				Favorites
			</Link>
		</Breadcrumbs>
	);
}
