import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

// Adapted from the Modern theme for SkeletonUI
export const jcrTheme: CustomThemeConfig = {
	name: 'jcr-theme',
	properties: {
		'--theme-font-family-base': "'Quicksand', sans-serif",
		'--theme-font-family-heading': "'Jost', sans-serif",
		'--theme-font-color-base': 'var(--color-surface-900)',
		'--theme-font-color-dark': 'var(--color-tertiary-50)',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '24px',
		'--theme-border-base': '3px',
		'--on-primary': '255 255 255',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		'--color-primary-50': '255 235 248',
		'--color-primary-100': '255 214 241',
		'--color-primary-200': '255 168 226',
		'--color-primary-300': '255 128 213',
		'--color-primary-400': '255 87 199',
		'--color-primary-500': '255 41 184',
		'--color-primary-600': '255 0 170',
		'--color-primary-700': '214 0 143',
		'--color-primary-800': '168 0 112',
		'--color-primary-900': '128 0 85',
		'--color-secondary-50': '218 244 249',
		'--color-secondary-100': '205 240 246',
		'--color-secondary-200': '193 237 244',
		'--color-secondary-300': '155 226 238',
		'--color-secondary-400': '81 204 225',
		'--color-secondary-500': '6 182 212',
		'--color-secondary-600': '5 164 191',
		'--color-secondary-700': '5 137 159',
		'--color-secondary-800': '4 109 127',
		'--color-secondary-900': '3 89 104',
		'--color-tertiary-50': '220 244 242',
		'--color-tertiary-100': '208 241 237',
		'--color-tertiary-200': '196 237 233',
		'--color-tertiary-300': '161 227 219',
		'--color-tertiary-400': '91 205 193',
		'--color-tertiary-500': '20 184 166',
		'--color-tertiary-600': '18 166 149',
		'--color-tertiary-700': '15 138 125',
		'--color-tertiary-800': '12 110 100',
		'--color-tertiary-900': '10 90 81',
		'--color-success-50': '237 247 220',
		'--color-success-100': '230 245 208',
		'--color-success-200': '224 242 197',
		'--color-success-300': '206 235 162',
		'--color-success-400': '169 219 92',
		'--color-success-500': '132 204 22',
		'--color-success-600': '119 184 20',
		'--color-success-700': '99 153 17',
		'--color-success-800': '79 122 13',
		'--color-success-900': '65 100 11',
		'--color-warning-50': '252 244 218',
		'--color-warning-100': '251 240 206',
		'--color-warning-200': '250 236 193',
		'--color-warning-300': '247 225 156',
		'--color-warning-400': '240 202 82',
		'--color-warning-500': '234 179 8',
		'--color-warning-600': '211 161 7',
		'--color-warning-700': '176 134 6',
		'--color-warning-800': '140 107 5',
		'--color-warning-900': '115 88 4',
		'--color-error-50': '253 227 227',
		'--color-error-100': '252 218 218',
		'--color-error-200': '251 208 208',
		'--color-error-300': '249 180 180',
		'--color-error-400': '244 124 124',
		'--color-error-500': '239 68 68',
		'--color-error-600': '215 61 61',
		'--color-error-700': '179 51 51',
		'--color-error-800': '143 41 41',
		'--color-error-900': '117 33 33',
		'--color-surface-50': '232 232 253',
		'--color-surface-100': '224 224 252',
		'--color-surface-200': '216 217 252',
		'--color-surface-300': '193 194 249',
		'--color-surface-400': '146 148 245',
		'--color-surface-500': '99 102 241',
		'--color-surface-600': '89 92 217',
		'--color-surface-700': '74 77 181',
		'--color-surface-800': '59 61 145',
		'--color-surface-900': '49 50 118'
	}
};

/*
NOTE: the original theme also had the following "enhancements":

	enhancements: {
		"[data-theme='modern'] h1,\n[data-theme='modern'] h2,\n[data-theme='modern'] h3,\n[data-theme='modern'] h4,\n[data-theme='modern'] h5,\n[data-theme='modern'] h6,\n[data-theme='modern'] a,\n[data-theme='modern'] button":
			{ fontWeight: 'bold' },
		"[data-theme='modern']": {
			backgroundImage:
				'radial-gradient(at 76% 0%, hsla(189,100%,56%,0.36) 0px, transparent 50%),\n\t\tradial-gradient(at 1% 0%, hsla(340,100%,76%,0.26) 0px, transparent 50%),\n\t\tradial-gradient(at 20% 100%, hsla(241,100%,70%,0.47) 0px, transparent 50%)',
			backgroundAttachment: 'fixed',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover'
		},
		".dark [data-theme='modern']": {
			backgroundImage:
				'radial-gradient(at 76% 0%, hsla(189,100%,56%,0.20) 0px, transparent 50%),\n\t\tradial-gradient(at 1% 0%, hsla(340,100%,76%,0.15) 0px, transparent 50%),\n\t\tradial-gradient(at 20% 100%, hsla(241,100%,70%,0.30) 0px, transparent 50%)',
			backgroundAttachment: 'fixed',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover'
		}
	}
    
*/
