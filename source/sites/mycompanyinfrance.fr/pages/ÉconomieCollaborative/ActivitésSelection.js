import classnames from 'classnames'
import { ScrollToTop } from 'Components/utils/Scroll'
import withSitePaths from 'Components/utils/withSitePaths'
import { without } from 'ramda'
import React, { useState, useContext } from 'react'
import emoji from 'react-easy-emoji'
import { Link } from 'react-router-dom'
import Animate from 'Ui/animate'
import activités from './activités.yaml'
import { StoreContext } from './StoreContext'

export default withSitePaths(function ActivitésSelection({ sitePaths }) {
	let { state, dispatch } = useContext(StoreContext)
	let { selectedActivities } = state

	return (
		<Animate.fromBottom>
			<ScrollToTop />
			<h1>Quels sont vos revenus ?</h1>
			<p>
				Les seuils de déclaration ne sont pas les mêmes en fonction du type
				d'activité que vous exercez. Sélectionnez toutes les plateformes depuis
				lesquelles vous avez reçu de l'argent durant l'année.
			</p>
			<ul
				css={`
					display: flex;
					justify-content: space-evenly;
					flex-wrap: wrap;
					li > * {
						width: 100%;
					}
					li {
						margin: 1rem 0;
						cursor: pointer;
						text-align: center
						width: 12em;
						.title {
							font-weight: 500;
						}
						img {
							width: 2em !important;
							height: 2em !important;
							margin: 0.6em 0 !important;
						}
						p {
							font-size: 95%;
							font-style: italic;
							text-align: center;
							line-height: 1em;
						}
					}
					li:hover, li.selected {background: var(--colour); color: white}
				`}>
				{activités.map(({ titre, exemples, icônes }) => {
					let selected = selectedActivities.includes(titre)
					return (
						<li
							className={classnames('ui__ card ', { selected })}
							key={titre}
							onClick={() => dispatch({ type: 'SELECT_ACTIVITY', titre })}>
							<div className="title">{titre}</div>
							{emoji(icônes)}
							<p>{exemples}</p>
						</li>
					)
				})}
			</ul>
			<p css="text-align: right">
				<Link
					to={sitePaths.économieCollaborative.activités.coConsommation}
					className={classnames('ui__ plain button', {
						disabled: !selectedActivities.length
					})}>
					Continuer
				</Link>
			</p>
		</Animate.fromBottom>
	)
})
