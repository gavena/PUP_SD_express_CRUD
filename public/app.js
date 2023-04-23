const provincesTable = document.getElementById('provinces');
const provinceForm = document.getElementById('province-form');

function renderProvinces() {
  fetch('/provinces')
    .then(res => res.json())
    .then(provinces => {
      provincesTable.tBodies[0].innerHTML = '';
      provinces.forEach(province => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = province.provinceId;
        const regionIdCell = document.createElement('td');
        regionIdCell.textContent = province.regionId;
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = province.description;
        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          document.getElementById('province-id').value = province.provinceId;
          document.getElementById('region-id').value = province.regionId;
          document.getElementById('description').value = province.description;
        });
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute("id","myButton")
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          fetch(`/provinces/${province.provinceId}`, { method: 'DELETE' })
            .then(() => {
              renderProvinces();
            })
            .catch(() => {
              alert('Something went wrong');
            });
        });
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        row.appendChild(idCell);
        row.appendChild(regionIdCell);
        row.appendChild(descriptionCell);
        row.appendChild(actionsCell);
        provincesTable.tBodies[0].appendChild(row);
      });
    });
}

provinceForm.addEventListener('submit', e => {
  e.preventDefault();
  const provinceId = document.getElementById('province-id').value;
  const regionId = document.getElementById('region-id').value;
  const description = document.getElementById('description').value;
  let url = '/provinces';
  let method = 'POST';

  console.log ("provinceId="+JSON.stringify({ regionId, description }));
  console.log ("regionId="+regionId);
  console.log ("description="+description);
  if (provinceId) {
    console.log ("hre");
    url += `/${provinceId}`;
    method = 'PUT';
  }
  fetch(url, {    
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ regionId, description })
  })
    .then(() => {
      renderProvinces();
      provinceForm.reset();
    })
    .catch(() => {
      alert('Something went wrong');
    });
});

renderProvinces();
