$(document).ready(function(){

    localStorage.setItem( '1', JSON.stringify({ id: 1, name: "book 1", author: "author 1", count: 10 }));
    localStorage.setItem( '2', JSON.stringify({id: 2, name: "book 2", author: "author 2", count: 5}));

    let book = JSON.parse( localStorage.getItem('1'));
    // console.log(localStorage);
    // let tr = document.createElement('tr');
    // $('tr').append('<th>').attr('scope', 'row');

    // $('tbody').append('<tr>');
    // $("<th/>", {
    //     'scope': 'row',
    // }).appendTo('tr');
    // $('[scope="row"]').append('<td/>');



    for (let i = 1; i <= localStorage.length; i++){
        $("tbody").append("<tr>");
        let temp = JSON.parse(localStorage.getItem(i));
        $("#name").append(temp.name);


    }




//    Модальное окно
    let card = document.querySelector('#sample-card')
    let button = document.querySelector('#sample-button')
    let paragraph = document.querySelector('#sample-paragraph')
    let words = paragraph.innerText.split(' ')
    let wordsMarkedUp = words.map(word => {
        return `<div class="muddle-word">${word}</div>
  <span> </span>`
    })

    let viewWidth = window.innerWidth
    let viewHeight = window.innerHeight
    let midX = viewWidth / 2
    let midY = viewHeight / 2

    function setDimensions() {
        viewWidth = window.innerWidth
        viewHeight = window.innerHeight
        midX = viewWidth / 2
        midY = viewHeight / 2
    }

    window.addEventListener('resize', setDimensions)

    paragraph.innerHTML = wordsMarkedUp.join('')
    paragraph.style.opacity = 1

    let wordNodes = paragraph.querySelectorAll('.muddle-word')

    function zoomOut(node, reverse = false) {
        let visible = { opacity: 1, z: 0 }
        let hidden = { opacity: 0, z: -1000 }
        let start = reverse ? hidden : visible
        let end = reverse ? visible : hidden
        node.style.transform = transform(start)
        node.style.opacity = start.opacity
        return new TWEEN.Tween(start)
            .to(end, 300)
            .onUpdate(function() {
                node.style.transform = transform(this)
                node.style.opacity = Math.min(this.opacity, 1)
            })
            .easing(TWEEN.Easing.Elastic.Out)
            .start()
    }

    function zoomIn(node, reverse = false) {
        let contracted = { opacity: 0, z: -800, depth: 8, s: 0.7 }
        let expanded = { opacity: 1, z: 0, depth: 10, s: 1 }
        let start = reverse ? expanded : contracted
        let end = reverse ? contracted : expanded
        let opacityMax = 0
        node.style.transform = transform(start);
        node.style.opacity = start.opacity;
        node.style.boxShadow = `0 0 ${start.depth}px 0 #444`
        return new TWEEN.Tween(start)
            .to(end, 600)
            .onUpdate(function() {
                node.style.transform = transform(this)
                node.style.boxShadow = `0 0 ${this.depth}px 0 #444`
                // Only ever *increase* opacity (for elastic/bounce)
                if (this.opacity > opacityMax && !reverse) {
                    node.style.opacity = Math.min(this.opacity, 1)
                    opacityMax = Math.min(this.opacity, 1)
                }
            })
            .easing(TWEEN.Easing.Elastic.Out)
            .start()
    }

    let staggerTweens

    function staggerZoom(nodeList, reverse = false) {
        if (staggerTweens) {
            staggerTweens.forEach((t) => {
                t.stop()
            })
        }
        let tweens = []
        for (var i = 0; i < nodeList.length; i++) {
            let node = nodeList[i]
            let hidden = { opacity: 0, y: (Math.random() * -50), z: -200 }
            let visible = { opacity: 1, y: 0, z: 0 }
            let start = reverse ? visible : hidden
            let end = reverse ? hidden : visible
            let opacityMin = 1
            node.style.transform = transform(0, start.y, start.z)
            node.style.opacity = start.opacity
            tweens.push(new TWEEN.Tween(start)
                .to(end,500 + (20 * i))
                .onUpdate(function() {
                    node.style.transform = transform(this)
                    // Only ever *decrease* opacity
                    if (this.opacity < opacityMin && reverse) {
                        node.style.opacity = Math.max(this.opacity, 0)
                        opacityMin = Math.max(this.opacity, 0)
                    } else if (!reverse) {
                        node.style.opacity = this.opacity
                    }
                })
                .easing(TWEEN.Easing.Elastic.Out)
                .delay(20)
                .start()
            )
        }
        staggerTweens = tweens
    }

    function metricOrZero(val, metric) {
        return `${val}${val === 0 ? '' : metric}`
    }

    function degreeValue(val) {
        return metricOrZero(val, 'deg')
    }

    function pixelValue(val) {
        return metricOrZero(val, 'px')
    }

    function transform(values) {
        return `${translate3d(values)} ${rotate3(values)} ${scale(values)}`
    }

    function scale(values) {
        return `scale(${values.s || 1})`
    }

    function rotate3(values) {
        let x = degreeValue (values.rx || 0)
        let y = degreeValue (values.ry || 0)
        let z = degreeValue (values.rz || 0)
        return `rotateX(${x}) rotateY(${y}) rotateZ(${z})`
    }

    function translate3d(values) {
        let x = pixelValue (values.x || 0)
        let y = pixelValue (values.y || 0)
        let z = pixelValue (values.z || 0)
        return `translate3d(${x}, ${y}, ${z})`
    }

    let cardExpanded = false

    card.addEventListener('click', () => {
        zoomIn(card, cardExpanded)
        zoomOut(button, cardExpanded)
        staggerZoom(wordNodes, cardExpanded)
        cardExpanded = !cardExpanded
    })

    requestAnimationFrame(animate)
    function animate(time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
    }

});
