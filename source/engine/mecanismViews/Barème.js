import React from 'react'
import { Node } from './common'
import { makeJsx } from '../evaluation'
import { Trans } from 'react-i18next'
import { trancheValue } from 'Engine/mecanisms/barème'
import { NodeValuePointer } from './common'
import './Barème.css'
import classNames from 'classnames'
import { ShowValuesConsumer } from 'Components/rule/ShowValuesContext'

export default function Barème(nodeValue, explanation) {
	return (
		<ShowValuesConsumer>
			{showValues => (
				<Node
					classes="mecanism barème"
					name="barème"
					value={nodeValue}
					child={
						<ul className="properties">
							<li key="assiette">
								<span className="key">
									<Trans>assiette</Trans>:{' '}
								</span>
								<span className="value">{makeJsx(explanation.assiette)}</span>
							</li>
							{explanation['multiplicateur des tranches'].nodeValue !== 1 && (
								<li key="multiplicateur">
									<span className="key">
										<Trans>multiplicateur des tranches</Trans>:{' '}
									</span>
									<span className="value">
										{makeJsx(explanation['multiplicateur des tranches'])}
									</span>
								</li>
							)}
							<table className="tranches">
								<thead>
									<tr>
										<th>
											<Trans>Tranches de l&apos;assiette</Trans>
										</th>
										<th>
											<Trans>Taux</Trans>
										</th>
										{showValues && (
											<th>
												<Trans>Valeurs</Trans>
											</th>
										)}
									</tr>
									{explanation.tranches.map(tranche => (
										<Tranche
											key={tranche['de'] + tranche['à']}
											{...{
												tranche,
												showValues,
												trancheValue: trancheValue(
													explanation['assiette'],
													explanation['multiplicateur des tranches']
												)(tranche)
											}}
										/>
									))}
								</thead>
							</table>
						</ul>
					}
				/>
			)}
		</ShowValuesConsumer>
	)
}

function Tranche({
	tranche: {
		'en-dessous de': maxOnly,
		'au-dessus de': minOnly,
		de: min,
		à: max,
		taux
	},
	trancheValue,
	showValues
}) {
	return (
		<tr className={classNames('tranche', { activated: trancheValue > 0 })}>
			<td key="tranche">
				{maxOnly
					? `En-dessous de ${maxOnly}`
					: minOnly
						? `Au-dessus de ${minOnly}`
						: `De ${min} à ${max}`}
			</td>
			<td key="taux"> {makeJsx(taux)}</td>
			{showValues && (
				<td key="value">
					<NodeValuePointer data={trancheValue} />
				</td>
			)}
		</tr>
	)
}
