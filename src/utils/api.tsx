/* eslint-disable @typescript-eslint/no-explicit-any */
export function checkResponse(res: any) {
  return res.ok
    ? res.json()
    : res.json().then((errorResponse: any) => {
        // ошибка с сообщением
        if (errorResponse) {
          return Promise.reject(errorResponse);
        }
        //  общее сообщение об ошибке
        return Promise.reject(
          new Error(`Ошибка ${res.statusText} ${res.status}`),
        );
      });
}

function request(url: string, options: any) {
  return fetch(`https://reqres.in/${url}`, options).then(checkResponse);
}

export function setHeaders() {
  const token = localStorage.getItem('token');

  if (token) {
    return {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    };
  }

  return {
    'Content-Type': 'application/json',
  };
}

export function filterSearch(params: any) {
  const query = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== false
    ) {
      if (Array.isArray(params[key])) {
        params[key].forEach((value: any) => {
          query.append(key, value.id);
        });
      } else {
        query.append(key, params[key]);
      }
    }
  });

  return request(`/filters/?${query.toString()}`, {
    method: 'GET',
    headers: setHeaders(),
  });
}
