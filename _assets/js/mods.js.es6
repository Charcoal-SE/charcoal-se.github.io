const key = '1658080a59604fa5386e39290dd415ed5270dc6f12fab053cd4cc3d32cb154d4'
const filter = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAR8A' // black magic :)

function getUsers(page = 1, users = []) {
  return fetch(`https://metasmoke.erwaysoftware.com/api/users?per_page=100&key=${key}&page=${page}&filter=${filter}`)
    .then(res => res.json())
    .then(({ has_more: hasMore, items }) => {
      users = users.concat(items)
      if (hasMore) {
        return getUsers(page + 1, users)
      } else {
        return users
      }
    })
}

getUsers().then(users => {
  const sites = {}
  const modSites = {}
  for (const user of users) {
    for (const site of user.moderator_sites) {
      sites[site.id] = site
      modSites[site.id] = modSites[site.id] || []
      modSites[site.id].push(user)
    }
  }

  const $ul = $('<ul />')
  for (const siteId of Object.keys(sites).sort((siteIdA, siteIdB) => {
    const nameA = sites[siteIdA].site_name
    const nameB = sites[siteIdB].site_name
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })) {
    const $li = $('<li />')
    const site = sites[siteId]
    $li.append(
      $('<strong />').attr({
        title: site.site_domain
      }).append(
        $('<a />').attr({
          href: site.site_url,
        }).append(
          $('<img />').attr({
            src: site.site_logo
          }).css({
            height: '1em',
            marginRight: '0.5em'
          })
        )
      ).append(site.site_name)
    )
    $li.append(': ')

    const links = []
    for (const { username, stack_exchange_account_id: accountId } of modSites[siteId]) {
      links.push($('<a />').attr('href', `https://stackexchange.com/users/${accountId}`).text(username)[0])
    }
    links.forEach(($link, i) => {
      $li.append($link)
      if (i < links.length - 1 && links.length > 2) { // not last
        $li.append(', ')
      }
      if (i === links.length - 2) { // second to last
        $li.append(' and ')
      }
    })

    $ul.append($li)
  }
  $('.mod-info').empty().append($ul)
})
