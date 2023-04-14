class SelectableArea {
	isDrawing = false
	
	points = {
		start: {},
		end: {},
		setStart: function (x, y) {
			this.start.x = x
			this.start.y = y
		},
		setEnd: function (x, y) {
			this.end.x = x
			this.end.y = y
		},
		get diffX() {
			return this.end.x - this.start.x
		},
		get diffY() {
			return this.end.y - this.start.y
		}
	}
	
	defaultSettings = {
		rectangle: {
			lineWidth: 1,
			fillStyle: 'rgba(100,100,100,0.5)',
			strokeStyle: '#AA14F0'
		},
		point: {
			strokeStyle: '#AA14F0',
			lineWidth: 5,
			fillStyle: '#AA14F0',
			type: 'rect'
		}
	}
	
	constructor(targetElement, onSelecetionEndCallback = null, settings = null) {
		this.targetElement = targetElement
		this.canvas = document.createElement('canvas')
		this.canvas.classList.add("selectable-area")
		targetElement.appendChild(this.canvas)
		
		this.onSelecetionEndCallback = onSelecetionEndCallback
		
		// put in on top of page
		this.canvas.style.position = "absolute"
		this.canvas.style.top = 0
		this.canvas.style.left = 0
		this.canvas.style.zIndex = "99 !important"
		
		this.context = this.canvas.getContext('2d')
		
		this.settings = settings || this.defaultSettings
		
		const width = targetElement?.offsetWidth || window.innerWidth
		this.canvas.width = width
		
		const height = targetElement?.offsetHeight || window.innerHeight
		this.canvas.height = height
		
		this.initEvenets() 
	}
	
	initEvenets() {
		
		const callback = () => {
			this.onSelecetionEndCallback && this.onSelecetionEndCallback(this)
		}
		
		this.canvas.addEventListener('mousedown', (e)  => {
			this.points.setStart(e.offsetX, e.offsetY)
			this.isDrawing = true
		})

		this.canvas.addEventListener('mousemove', (e)  => {
			if (this.isDrawing) {
				this.points.setEnd(e.offsetX, e.offsetY)
				this.redraw()
			}
		})

		this.canvas.addEventListener('mouseup', (e)  => {
			this.isDrawing = false
			this.points.setEnd(e.offsetX, e.offsetY)
			callback()
		})

		this.canvas.addEventListener('mouseleave', (e)  => {
			this.isDrawing = false
			this.clear()
		})
	}
	
	clear() {
		this.canvas.width = this.canvas.width
	}
	
	resize() {
		this.canvas.width = this.targetElement?.offsetWidth || window.innerWidth
		this.canvas.height = this.targetElement?.offsetHeight || window.innerHeight
	}
	
	redraw() {
		this.clear()
		this.drawRectangle()
		this.drawPoints()
	}
	
	drawRectangle() {
		this.context.beginPath()
		this.applySettings(this.context, this.settings.rectangle)
		this.context.rect(this.points.start.x, this.points.start.y, this.points.diffX, this.points.diffY)
		this.context.fill()
		this.context.stroke()
	}
	
	drawPoints() {
		const pointTypes = {
			circle: function(context, points) {
				context.arc(points.x, points.y, 3, 0, 2 * Math.PI, false)
			},
			rect: function(context, points) {
				context.rect(points.x, points.y, 4, 4)
			}
		}
		
		const drawFigure = (points) => {
			this.context.beginPath()
			const pointType = this.settings.point.type
			const drawPoint = pointTypes[pointType] || pointsTypes["circle"]
			drawPoint(this.context, points)
			this.context.fill()
			this.context.stroke()
		}

		this.applySettings(this.context, this.settings.point)
		drawFigure(this.points.start)
		drawFigure(this.points.end)
	}
	
	applySettings(obj, settings) {
		Object.keys(settings).forEach(prop => {
			obj[prop] = settings[prop]
		})
	}
	
	get startPoint() {
		return { x: this.points.start.x, y: this.points.start.y }
	}
	
	get endPoint() {
		return { x: this.points.end.x, y: this.points.end.y }
	}
	
	// x and y is left top corner points
	get rectangle() {
		return {
			x: Math.min(this.startPoint.x, this.endPoint.x),
			y: Math.min(this.startPoint.y, this.endPoint.y),
			width: Math.abs(this.endPoint.x - this.startPoint.x),
			height: Math.abs(this.endPoint.y - this.startPoint.y)
		}
	}
}

const logRect = (area) => { alert(JSON.stringify(area.rectangle)) }

const selectableArea = new SelectableArea(document.body, logRect)

window.addEventListener('resize', function(event) {
	selectableArea.resize()
}, true)