//= require vendor/lunr
//= require vendor/react
//= require vendor/react-dom
(function () {
  let index = null,
      store = null
  window.search = query => {
    if (index == null) {
      index = lunr(i => {
        i.field('id')
        i.field('title', {
          boost: 10
        })
        i.field('content')
      })

      $.get('/search.json', _s => {
        store = _s
        for (let id in store) {
          if (store.hasOwnProperty(id) && store[id] == null) {
            delete store[id]
          }
        }
        for (let id in store) {
          if (store.hasOwnProperty(id)) {
            index.add({
              id,
              ...store[id],
            })
          }
        }
        ready = true
        search(query)
      }).fail(console.error)

      return
    }
    if (!store) {
      return
    }
    $('.search .big-input').focus()
    el.setState({ query: query || '' })
  }

  class SearchView extends React.Component {
    constructor (...args) {
      super(...args)
      this.state = {
        query: '',
        selected: 0
      }
      this._permalink = this._permalink.bind(this)
      this._search = this._search.bind(this)
      this._handleKey = this._handleKey.bind(this)
    }
    hide (e) {
      if ($(e.target.parentNode).hasClass('search') || $(e.target).hasClass('close')) {
        $('.search').fadeOut()
      }
    }
    _permalink (e) {
      Turbolinks.visit(`/search?q=${encodeURIComponent(this.state.query).replace(/%20/g, '+')}`)
    }
    _search (e) {
      this.setState({
        query: e.target.value
      })
    }
    _handleKey (e) {
      clamp = val => {
        if (val < 0) return 0
        if (val >= this.results.length) return this.results.length - 1
        return val
      }
      switch (e.which) {
        case 27: // ␛
          this.hide()
          break
        case 38: // ↑
          this.setState(({ selected }) => ({ selected: clamp(selected - 1) }))
          e.preventDefault()
          break;
        case 40: // ↓
          this.setState(({ selected }) => ({ selected: clamp(selected + 1) }))
          e.preventDefault()
          break
        case 13: // ⏎
          Turbolinks.visit(this.results[this.state.selected].page.url)
          break
        default:
          break
      }
    }
    get results () {
      return index
        .search(this.state.query)
        .map(({ ref, score }) => ({ ref, score, page: store[ref] }))
    }
    render () {
      return <div>
        <span className='controls'>
          <a className='close' title='Close' onClick={this.hide}>╳</a>
          <a className='link' title='Permalink' onClick={this._permalink}><i className='fa fa-link' /></a>
        </span>
        <input type='text' placeholder='Search…' className='big-input' autoComplete='off' value={this.state.query} onChange={this._search} onKeyDown={this._handleKey} />
        {this._status}
        <ul className='search-results'>{this._results}</ul>
      </div>
    }
    get _results () {
      if (!this.state.query || !index || !store) {
        return
      }
      res = this.results
        .map(({ ref, page }, i) => <li key={ref} className={this.state.selected === i && 'selected'}>
          <a href={page.url}>{page.title}</a>
        </li>)
      return res.length ? res : <li><em>No results</em></li>
    }
    get _status () {
      if (!index || !store) {
        return <p>
          <em>Loading…</em>
        </p>
      }
    }
  }

  var el = ReactDOM.render(<SearchView />, $('.search')[0])

})()
