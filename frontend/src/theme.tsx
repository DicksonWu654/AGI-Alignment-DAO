import { color, extendTheme } from "@chakra-ui/react"

const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)"
};

const theme = extendTheme({
    styles: {
		global: ({ colorMode }: any) => ({
			body: {
				bg: colorMode === 'dark' ? '#12141a' : '#f0f0f0',
				color: colorMode === 'dark' ? '#fff' : '#12141a'
			},
			'::-webkit-scrollbar': {
				width: '5px',
			},
			'::-webkit-scrollbar-track': {
				background: 'transparent'
			},
			'::-webkit-scrollbar-thumb': {
				background: "#444" 
			},
		})
    }, 
	components: {
		Form: {
			variants: {
				floating: {
					container: {
						_focusWithin: {
							label: {
								...activeLabelStyles
							}
						},
						"input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
							...activeLabelStyles
						},
						label: {
							top: 0,
							left: 0,
							zIndex: 2,
							position: "absolute",
							backgroundColor: "#102c34",
							pointerEvents: "none",
							mx: 3,
							px: 1,
							my: 2,
							transformOrigin: "left top"
						}
					}
				}
			}
		},
		Box: {
			variants: {
				'lefi': {
					bg: 'blue',
				},
			},
		},
		Modal: {
			baseStyle: {
			  dialog: {
				bg: "#12141a",
				borderWidth: "0.01rem",
				borderColor: "#d0d0d0",
				borderRadius: 10,
			  },
			},
		  },
	}
})

export default theme