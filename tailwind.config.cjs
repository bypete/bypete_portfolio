const plugin = require('tailwindcss/plugin');
const { addDynamicIconSelectors } = require('@iconify/tailwind');
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        fontFamily: {
            Roboto: ['"Roboto"', 'sans-serif'],
            headline: ['"Montserrat"', 'sans-serif'],
            Georgia: ['Georgia', 'Times New Roman', 'Times,serif'],
        },
        aspectRatio: {
            auto: 'auto',
            square: '1 / 1',
            video: '16 / 9',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            13: '13',
            14: '14',
            15: '15',
            16: '16',
        },
        container: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1200px',
            },
            // padding: (theme) => ({
            //   DEFAULT: 'theme(spacing[4])', // 16px
            //   sm: 'theme(spacing[4])', // 16px
            //   md: 'theme(spacing[8])', // 32px
            //   '2xl': '0', // 0px
            // }),
        },
        extend: {
            screens: {
                mincon: '75rem', // 1200px
                // con3xlpad: '51.75rem', // 1.875rem + 48rem + 1.875rem
                con3xlpad:
                    'calc(48rem + clamp(0rem, 39.375rem + -50vw, 1.875rem) * 2)', // 48rem + --container-padding
                conpad: '78.75rem', // 1.875rem + 75rem + 1.875rem
            },
            zIndex: {
                60: '60',
                70: '70',
                80: '80',
                90: '90',
                100: '100',
                1000: '1000',
                toast: '2001',
                overlay: '2000',
                shortcuts: '1001',
                banner: '1000',
                bannershadow: '999',
                underlay: '990',
                toc: '900',
            },
            data: {
                up: 'banner=up',
                down: 'banner=down',
                start: 'banner=start',
            },
            gridTemplateAreas: {
                // uses grid-areas plugin
                listing: ['image ', 'description'],
                listingwide: ['description image'],
                blog: ['main', 'footer', 'aside'],
                blogwide: ['main   aside', 'footer aside'],
                blockTTB: ['visual', 'content'],
                blockBTT: ['content', 'visual'],
                blockLTR: ['content visual'],
                blockRTL: ['visual content'],
                preview: ['meta', 'visual', 'content'],
                preview_wide: ['meta meta', 'visual content'],
                listing_work: ['visual', 'content'],
                listing_work_wide: ['content visual'],
                toast: ['message close', 'action action'],
                footer: ['logo', 'availability', 'legal', 'social'],
                footerwide: ['logo logo logo', 'legal availability social'],
            },
            gridTemplateColumns: {
                header: '1fr, auto, 1fr',
                featuredcard: '2fr 1fr',
                block33: 'minmax(0, 1fr) minmax(0, 2fr)',
                block40: 'minmax(0, 2fr) minmax(0, 3fr)',
                block50: 'repeat(2, minmax(0, 1fr))',
                block60: 'minmax(0, 3fr) minmax(0, 2fr)',
                block66: 'minmax(0, 2fr) minmax(0, 1fr)',
                showcase: 'repeat(4, minmax(0, 1fr))',
                listing: 'minmax(0, 2fr) minmax(0, 1fr)',
                prevnext: 'repeat(auto-fill, minmax(0, 300px))',
                listing_work: 'minmax(0, 2fr) minmax(0, 3fr)',
                dropmenu: 'repeat(auto-fit, minmax(200px, 1fr))',
                taglist: 'repeat(auto-fit, minmax(120px, 1fr))',
                logos: 'repeat(auto-fill, minmax(100px, 1fr))',
                credit: 'auto minmax(auto, 1fr)',
                icon: 'auto minmax(auto, 1fr)',
                social: 'repeat(auto-fit, minmax(0, 48px))',
                workcontianer:
                    '56.25vw calc(43.75vw - ((100vw - 78.75rem) / 2)) minmax(0, 1fr)',
                // work: '56.25vw minmax(0, 1fr)',
            },
            gridTemplateRows: {
                workcard: 'auto auto minmax(0, 1fr) auto',
                work: 'auto minmax(0, 1fr)',
                home: 'auto minmax(0, 1fr)',
            },
            spacing: (theme) => ({
                tight: '3px',
                50: '12.5rem', // 200px
                120: '30rem', // 480px
                100: '25rem', // 400px
                block: '40vw', // 5:2 default block / cinema
                spread: '50vw', // 2:1
                square: '100vw', // 1:1
                widescreen: '56.25vw', // 16:9
                photo: '66.67vw', // 3:2
                portrait: '150vw', // 2:3
                tv: '75vw', // 4:3
                super16: '60vw', // 5:3 mobile block image
                '5/2pc': '2.5%',
                '5pc': '5%',
                '5px': '0.3125rem', // 5px
                ...theme('utopiaSpace'),
            }),
            height: {
                screenLvh: [
                    '100vh /* fallback for Opera, IE and etc. */',
                    '100lvh',
                ],
                screenSvh: [
                    '100vh /* fallback for Opera, IE and etc. */',
                    '100svh',
                ],
                screenDvh: [
                    '100vh /* fallback for Opera, IE and etc. */',
                    '100dvh',
                ],
            },
            width: {
                screenLvw: [
                    '100vw /* fallback for Opera, IE and etc. */',
                    '100lvw',
                ],
                screenSvw: [
                    '100vw /* fallback for Opera, IE and etc. */',
                    '100svw',
                ],
                screenDvw: [
                    '100vw /* fallback for Opera, IE and etc. */',
                    '100dvw',
                ],
            },
            minWidth: (theme) => ({
                ...theme('spacing'),
                ...theme('width'),
            }),
            maxWidth: (theme) => ({
                ...theme('spacing'),
                ...theme('width'),
                container: '78.75rem', // 1260px
            }),
            minHeight: (theme) => ({
                ...theme('spacing'),
                ...theme('height'),
                '33vw': '33.33vw',
                '25vw': '25vw',
                '50vw': '50vw',
            }),
            maxHeight: (theme) => ({
                ...theme('spacing'),
                ...theme('height'),
            }),
            inset: (theme) => ({
                ...theme('spacing'),
                ...theme('width'),
                ...theme('height'),
            }),
            opacity: {
                99: '0.99',
            },
            borderRadius: {
                abstract: '80% 90% 65% 40% / 50% 100% 100% 100%',
                tight: '3px',
            },
            borderWidth: {
                tight: '3px',
            },
            padding: {
                block: '40%', // 5:2
                spread: '50%', // 2:1
                widescreen: '56.25%', // 16:9
                photo: '66.67%', // 3:2
                portrait: '133.33%', // 3:4
                tv: '75%', // 4:3
                square: '100%', // 1:1
                '5/2pc': '2.5%',
                '5pc': '5%',
            },
            lineHeight: (theme) => ({
                inherit: 'inherit', // inherit parent
                ...theme('utopiaSpace'),
            }),
            utopiaStep: {
                'fl-step--2': 'var(--step--2)',
                'fl-step--1': 'var(--step--1)',
                'fl-base': 'var(--step-0)',
                'fl-step-0': 'var(--step-0)',
                'fl-step-1': 'var(--step-1)',
                'fl-step-2': 'var(--step-2)',
                'fl-step-3': 'var(--step-3)',
                'fl-step-4': 'var(--step-4)',
                'fl-step-5': 'var(--step-5)',
                'fl-step-6': 'var(--step-6)',
                'fl-step-7': 'var(--step-7)',
            },
            utopiaSpace: {
                'fl-space-3xs': 'var(--space-3xs)',
                'fl-space-2xs': 'var(--space-2xs)',
                'fl-space-xs': 'var(--space-xs)',
                'fl-space-s': 'var(--space-s)',
                'fl-space-m': 'var(--space-m)',
                'fl-space-l': 'var(--space-l)',
                'fl-space-xl': 'var(--space-xl)',
                'fl-space-2xl': 'var(--space-2xl)',
                'fl-space-3xl': 'var(--space-3xl)',
                'fl-space-4xl': 'var(--space-4xl)',
                /* One-up pairs */
                'fl-space-3xs-2xs': 'var(--space-3xs-2xs)',
                'fl-space-2xs-xs': 'var(--space-2xs-xs)',
                'fl-space-xs-s': 'var(--space-xs-s)',
                'fl-space-s-m': 'var(--space-s-m)',
                'fl-space-m-l': 'var(--space-m-l)',
                'fl-space-l-xl': 'var(--space-l-xl)',
                'fl-space-xl-2xl': 'var(--space-xl-2xl)',
                'fl-space-2xl-3xl': 'var(--space-2xl-3xl)',
                'fl-space-3xl-4xl': 'var(--space-3xl-4xl)',
                /* Custom pairs */
                'fl-space-s-l': 'var(--space-s-l)',
                'fl-space-m-s': 'var(--space-m-s)',
                'fl-space-s-xs': 'var(--space-s-xs)',
                'fl-space-header': 'var(--headerheight)',
                /* Custom */
                'fl-space-splashoverlap': 'var(--splash-overlap)',
                'fl-space-containertramline': 'var(--container-tramline)',
            },
            fontSize: (theme) => ({
                ...theme('utopiaStep'),
                ...theme('utopiaSpace'),
            }),
            textShadow: {
                xs: '1px 1px 0 var(--tw-shadow-color), -1px 1px 0 var(--tw-shadow-color), 1px -1px 0 var(--tw-shadow-color), -1px -1px 0 var(--tw-shadow-color)',
                md: '1px 1px 5px var(--tw-shadow-color)',
                lg: '15px 15px 10px var(--tw-shadow-color)',
                emboss: '1px 1px var(--tw-shadow-color)',
                heavy: '0 0 5px var(--tw-shadow-color), 0 0 15px var(--tw-shadow-color)',
                headline:
                    '1px 1px 3px rgba(0,0,0, 0.15), 0 0 10px var(--tw-shadow-color)',
                crisp: '0 1px 1px var(--tw-shadow-color)',
                DEFAULT: '2px 2px 0 var(--tw-shadow-color)',
                none: 'none',
            },
            dropShadow: {
                svg: ['0px 0px 16px var(--tw-shadow-color)'],
                logo: ['1px 1px 5px var(--tw-shadow-color)'],
                circle: [
                    '0 20px 10px var(--tw-shadow-color)',
                    '0 10px 5px var(--tw-shadow-color)',
                ],
                '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
                '4xl': [
                    '0 35px 35px rgba(0, 0, 0, 0.25)',
                    '0 45px 65px rgba(0, 0, 0, 0.15)',
                ],
            },
            boxShadow: {
                cardhover: '0 0 75px -25px rgba(0,0,0,.75)',
                '3xl': '0 0 75px 50px var(--tw-shadow-color)',
                '4xl': '0 0 50px 50px rgba(0,0,0,.60)',
                '5xl': '0 0 125px 50px var(--tw-shadow-color)',
                '2xlx': '0 0 10px 5px rgba(35,31,32,.10)',
                '3xlx': '0 0 0px 6px rgba(35,31,32,0.10)',
                '3xlr': '0 0 75px 50px rgba(35,31,32,.25)',
                thumb: 'var(--tw-shadow-color) 0px 2px 5px -1px, var(--tw-shadow-color) 0px 1px 3px -1px',
                icon: 'inset 0 2px 6px -1px var(--tw-shadow-color)',
                raised: [
                    '0px 2px 6px -1px rgb(var( --color-shadow-raised) / 0.12)',
                    '0px 0px 3px -1px rgb(var( --color-shadow-raised) / 0.08)',
                ],
                overlay: [
                    '0px 2px 10px -1px rgb(var( --color-shadow-overlay) / 0.10)',
                    '0px 0px 5px -1px rgb(var( --color-shadow-overlay) / 0.45)',
                ],
                inset: [
                    'inset 0 2px 6px -1px rgb(var( --color-shadow-inset) / 0.16)',
                    '0px 0px 1px 1px rgb(var( --color-shadow-highlight) / 0.25)',
                ],
                highlight: [
                    '0px -1px 0px 0px rgb(var( --color-shadow-highlight) / 0.25)',
                ],
                placeholder: 'inset 0 0px 1px 1px rgba(0,0,0,.10)',
                banner: '-4px 0px 8px 4px var(--tw-shadow-color)',
                dropdown: '0px 5px 15px var(--tw-shadow-color)',
                offcanvas: [
                    'inset 0px 0px 25px 15px rgb(var(--color-shadow-offcanvas) / 0.75)',
                ],
                floated:
                    '0px 2px 1px -1px rgb(var(--shadow-highlight) / 0.75), inset 0px 2px 1px 1px rgb(var(--color-shadow-floated) / 0.15), 0px 0px 10px 5px rgb(var(--color-shadow-floated) / 0.15)',
            },
            backgroundImage: {
                shader: 'var(--shader)',
            },
            aspectRatio: {
                '4/3': '4 / 3',
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                content: {
                    light: 'rgb(var(--color-content-light) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-content) / <alpha-value>)',
                    dark: 'rgb(var(--color-content-dark) / <alpha-value>)',
                    whisper:
                        'rgb(var(--color-content-whisper) / <alpha-value>)',
                    quiet: 'rgb(var(--color-content-quiet) / <alpha-value>)',
                    loud: 'rgb(var(--color-content-loud) / <alpha-value>)',
                    shout: 'rgb(var(--color-content-shout) / <alpha-value>)',
                    footer: 'rgb(var(--color-content-footer) / <alpha-value>)',
                    tag: 'rgb(var(--color-content-tag) / <alpha-value>)',
                    featured:
                        'rgb(var(--color-content-featured) / <alpha-value>)',
                },
                headline: {
                    DEFAULT: 'rgb(var(--color-headline) / <alpha-value>)',
                    start: 'rgb(var(--color-headline-start) / <alpha-value>)',
                    end: 'rgb(var(--color-headline-end) / <alpha-value>)',
                },
                focus: 'rgb(var(--color-focus) / <alpha-value>)',
                link: {
                  light: 'rgb(var(--color-link-light) / <alpha-value>)',
                  DEFAULT: 'rgb(var(--color-link) / <alpha-value>)',
                  dark: 'rgb(var(--color-link-dark) / <alpha-value>)',
                },
                banner: {
                    DEFAULT: 'transparent',
                    up: 'rgb(var(--color-banner-up) / <alpha-value>)',
                },
                underlay: {
                    light: 'rgb(var(--color-underlay-light) / <alpha-value>)',
                    dark: 'rgb(var(--color-underlay-dark) / <alpha-value>)',
                },
                overlay: {
                    light: 'rgb(var(--color-overlay-light) / <alpha-value>)',
                    dark: 'rgb(var(--color-overlay-dark) / <alpha-value>)',
                },
                surface: {
                  raised: 'rgb(var(--color-surface-raised) / <alpha-value>)',
                  DEFAULT:
                  'rgb(var(--color-surface) / <alpha-value>)',
                  sunken: 'rgb(var(--color-surface-sunken) / <alpha-value>)',
                  sunk: 'rgb(var(--color-surface-sunk) / <alpha-value>)',
                  bedrock:
                    'rgb(var(--color-surface-bedrock)/ <alpha-value>)',
                   overlay:
                    'rgb(var(--color-surface-overlay) / <alpha-value>)',
                },
                line: {
                    whisper: 'rgb(var(--color-line-whisper) / <alpha-value>)',
                    quiet: 'rgb(var(--color-line-quiet) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-line) / <alpha-value>)',
                    loud: 'rgb(var(--color-line-loud) / <alpha-value>)',
                    shout: 'rgb(var(--color-line-shout) / <alpha-value>)',
                },
                outline: {
                    whisper:
                        'rgb(var(--color-outline-whisper) / <alpha-value>)',
                    quiet: 'rgb(var(--color-outline-quiet) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-outline) / <alpha-value>)',
                    loud: 'rgb(var(--color-outline-loud) / <alpha-value>)',
                    shout: 'rgb(var(--color-outline-shout) / <alpha-value>)',
                },
                info: {
                    DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
                    shade: 'rgb(var(--color-info-shade) / <alpha-value>)',
                },
                note: {
                    DEFAULT: 'rgb(var(--color-note) / <alpha-value>)',
                    shade: 'rgb(var(--color-note-shade) / <alpha-value>)',
                },
                gold: 'rgb(var(--color-gold) / <alpha-value>)',
                alert: {
                    DEFAULT: 'rgb(var(--color-alert) / <alpha-value>)',
                    shade: 'rgb(var(--color-alert-shade) / <alpha-value>)',
                },
                attention: {
                    DEFAULT: 'rgb(var(--color-attention) / <alpha-value>)',
                    shade: 'rgb(var(--color-attention-shade) / <alpha-value>)',
                },
                hilite: {
                    DEFAULT: 'rgb(var(--color-hilite) / <alpha-value>)',
                },
                tag: {
                    DEFAULT: 'rgb(var(--color-tag) / <alpha-value>)',
                    link: 'rgb(var(--color-tag-link) / <alpha-value>)',
                    hover: 'rgb(var(--color-tag-hover) / <alpha-value>)',
                    featured: 'rgb(var(--color-tag-featured) / <alpha-value>)',
                },
                warning: {
                    DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
                    shade: 'rgb(var(--color-warning-shade) / <alpha-value>)',
                },
                brand: {
                    light: 'rgb(var(--color-brand-light) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
                    dark: 'rgb(var(--color-brand-dark) / <alpha-value>)',
                    shade: 'rgb(var(--color-brand-shade) / <alpha-value>)',
                },
                accent: {
                    light: 'rgb(var(--color-accent-light) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
                    dark: 'rgb(var(--color-secondary-dark) / <alpha-value>)',
                    shade: 'rgb(var(--color-accent-shade) / <alpha-value>)',
                },
                primary: {
                    light: 'rgb(var(--color-primary-light) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
                    dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
                    shade: 'rgb(var(--color-primary-shade) / <alpha-value>)',
                },
                secondary: {
                    light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
                    dark: 'rgb(var(--color-secondary-dark) / <alpha-value>)',
                    shade: 'rgb(var(--color-secondary-shade) / <alpha-value>)',
                },
                link: {
                    light: 'rgb(var(--color-link-light) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-link) / <alpha-value>)',
                    dark: 'rgb(var(--color-link-dark) / <alpha-value>)',
                    shade: 'rgb(var(--color-link-shade) / <alpha-value>)',
                },
                disabled: {
                    DEFAULT: 'rgb(var(--color-disabled) / <alpha-value>)',
                },
            },
            // https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': 'rgb(var(--color-content))',
                        '--tw-prose-headings': 'rgb(var(--color-headline))',
                        '--tw-prose-bold': 'rgb(var(--color-content))',
                        '--tw-prose-code': 'rgb(var(--color-content))',
                        '--tw-prose-quotes': 'rgb(var(--color-blockquote))',
                        code: {
                            background: 'rgb(var(--color-outline))',
                            padding: [theme('spacing.[1.5]')],
                            'border-radius': [theme('spacing.tight')],
                            border: '1px solid rgb(var(--color-outline-loud))',
                        },
                        a: {
                            color: 'rgb(var(--color-accent))',
                            '&:hover': {
                                color: 'rgb(var(--color-accent-dark))',
                            },
                        },
                        img: null,
                        picture: null,
                        figure: null,
                    },
                },
                lg: {
                    css: {
                        img: null,
                        picture: null,
                        figure: null,
                    },
                },
            }),
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                hold: {
                    '0%': {
                        opacity: '1',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                wait: {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '0',
                    },
                },

                'fade-in': {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                'fade-out': {
                    '0%': {
                        opacity: '1',
                    },
                    '100%': {
                        opacity: '0',
                    },
                },
                'nudge-down': {
                    '0%, 100%': {
                        transform: 'translateY(0%)',
                        'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
                    },
                    '50%': {
                        transform: 'translateY(25%)',
                        'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
                    },
                },
                'nudge-right': {
                    '0%, 100%': {
                        transform: 'translateX(0%)',
                        'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
                    },
                    '50%': {
                        transform: 'translateX(25%)',
                        'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
                    },
                },

                'fade-in-zoom': {
                    '0%': {
                        opacity: '0',
                        transform: 'scale(0.75)',
                    },
                    '25%': {
                        opacity: '1',
                        transform: 'scale(1.10)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'scale(1)',
                    },
                },
                'fade-in-down': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-10%)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                'fade-out-down': {
                    from: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                    to: {
                        opacity: '0',
                        transform: 'translateY(10%)',
                    },
                },
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(50%)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                stretch: {
                    '0%': {
                        opacity: '1',
                        transform: 'scale(0.97)',
                        'transform-origin': '50% 100%',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'scale(1)',
                        'transform-origin': '50% 100%',
                    },
                },

                morph: {
                    '0%': {
                        'border-radius': '40% 60% 60% 40% / 70% 30% 70% 30%',
                    },
                    '100%': {
                        'border-radius': '40% 60%',
                    },
                },
                morphmask: {
                    '0%': {
                        'border-radius':
                            '100% 100% 100% 35% / 100% 100% 100% 100%',
                    },
                    '100%': {
                        'border-radius':
                            '100% 61% 83% 100% / 100% 78% 100% 100% ',
                    },
                },
                spin: {
                    '100%': {
                        transform: 'rotate(1turn)',
                    },
                },
            },
            animation: {
                // Use wait to add a delay but keeping opacity 0 from outset. Include same delay for the second animation.
                // @keyframes name | duration | timing-function | delay | direction | iteration-count | fill-mode | play-state
                blink: 'blink 1s infinite',
                appear: 'wait 100ms, fade-in 750ms ease-out 100ms forwards',
                'fade-in': 'wait 250ms, fade-in 1s ease-out 250ms',
                'fade-in-down':
                    'wait 100ms, fade-in-down 500ms ease-in-out 100ms',
                'fade-out-down': 'fade-out-down 500ms ease-out forwards',
                'fade-in-up': 'fade-in-up 250ms ease-out forwards',

                'nudge-down': 'nudge-down 1s infinite',
                'nudge-right': 'nudge-right 1s 2',
                stretch: 'stretch 500ms ease-in forwards',
                morph: 'morph 10s linear infinite alternate, spin 25s linear infinite 2500ms reverse',
                morphmask: 'morphmask 120s linear infinite alternate',
                'morph-delay':
                    'morph 60s linear infinite alternate, spin 60s linear infinite  8s reverse',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@savvywombat/tailwindcss-grid-areas'),
        addDynamicIconSelectors(),
        // https://laravel-code.tips/you-can-add-this-tailwind-plugin-to-generate-child-selector-variants/
        plugin(({ addVariant }) => {
            // Targets any img tag inside the element with img: class
            addVariant('img', '& img');
            addVariant('svg', '& svg');
            addVariant('permalink', ['& h1', '& h2']);
            addVariant('x-cloak', '&[x-cloak]');
            addVariant('permalink-first', [
                '&:first-child h1',
                '&:first-child h2',
                '&:first-child h3',
                '&:first-child h4',
                '&:first-child h5',
            ]);
        }),
        plugin(({ addUtilities, matchUtilities, theme }) => {
            addUtilities({
                '.breakout': {
                    width: '100vw',
                    'max-width': 'none',
                    left: '50%',
                    right: '50%',
                    position: 'relative',
                    'margin-left': '-50vw',
                    'margin-right': '-50vw',
                },
                '.bookmarkclip': {
                    'clip-path':
                        'polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 10%), 0 100%)',
                },
                '.angleclip': {
                    'clip-path':
                        'polygon(0 0, 100% 0, 100% 100%, 0% calc(100% - 80px))',
                },
                '.angleclip-lg': {
                    'clip-path':
                        'polygon(0 0, 100% 0, 100% 100%, 0% calc(100% - 120px))',
                },
            });
            matchUtilities(
                {
                    'text-shadow': (value) => ({
                        textShadow: value,
                    }),
                },
                { values: theme('textShadow') },
            );
            addUtilities({
                '.mask-repeat': {
                    maskRepeat: 'repeat',
                },
                '.mask-repeat-x': {
                    maskRepeat: 'repeat-x',
                },
                '.mask-repeat-y': {
                    maskRepeat: 'repeat-y',
                },
                '.mask-repeat-space': {
                    maskRepeat: 'space',
                },
                '.mask-repeat-round': {
                    maskRepeat: 'round',
                },
                '.mask-no-repeat': {
                    maskRepeat: 'no-repeat',
                },
            });
            matchUtilities(
                {
                    'mask-size': (value) => ({
                        maskSize: value,
                    }),
                },
                {
                    values: {
                        ...theme('backgroundSize'),
                        ...theme('utopiaSpace'),
                    },
                },
            );
            matchUtilities(
                {
                    mask: (value) => ({
                        maskPosition: value,
                    }),
                },
                {
                    values: theme('backgroundPosition'),
                },
            );
        }),
    ],
};
