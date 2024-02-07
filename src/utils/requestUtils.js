export const getPureUrl = () => {
  return `${window.location.protocol}//${window.location.host}`
}

export const createBaseUrl = (params = {}) => {
  let base = `${getPureUrl()}/custom_web_template.html?object_code=course_methods_api&`
  Object.keys(params).forEach(key => (base += `${key}=${params[key]}&`))
  return base
}
