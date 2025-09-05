
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Alert,
//   TableSortLabel,
//   TablePagination,
//   Box,
//   Button
// } from '@mui/material';
// import MainCard from 'ui-component/cards/MainCard';
// import PlatformUserRegistration from './PlatformUserRegistration';
// import EditPlatformUserModal from './EditPlatformUserModal'; // adjust path


// export default function PlatformUser() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [orderBy, setOrderBy] = useState('id');
//   const [order, setOrder] = useState('asc');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [open, setOpen] = useState(false);

//   const [editOpen, setEditOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const baseURL = import.meta.env.VITE_APP_BASE_URL;

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setEditOpen(true);
//   };

//   // Fetch users
//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseURL}/api/users`);
//       setUsers(res.data.users);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);


//   // Sorting logic
//   const handleSort = (property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const sortedUsers = [...users].sort((a, b) => {
//     const aValue = a[orderBy]?.toString().toLowerCase();
//     const bValue = b[orderBy]?.toString().toLowerCase();
//     if (aValue < bValue) return order === 'asc' ? -1 : 1;
//     if (aValue > bValue) return order === 'asc' ? 1 : -1;
//     return 0;
//   });

//   // Pagination
//   const paginatedUsers = sortedUsers.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );




//   return (
//     <MainCard 
//       sx={{
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//             transition: 'box-shadow 0.3s ease-in-out',
//             '&:hover': {
//               boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)' // or keep the same value to prevent disappearing
//             }
//           }}
//       title={
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             backgroundColor: '#1976d2',
//             color: 'white',
//             padding: '20px 16px',
//             borderRadius: '8px'
//           }}>
//             <span>Platform User</span>
//           </div>
//         }
//       >
//       <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
//         <Typography variant="body2" gutterBottom>
//           Below is a list of platform users.
//         </Typography>
//         <Box sx={{ p: 2 }}>
//           <Button variant="contained" onClick={() => setOpen(true)}>
//             Add New Platform User
//           </Button>

//           <PlatformUserRegistration open={open} setOpen={setOpen} onSuccess={fetchUsers/* optional: refresh user list here if needed*/ }/> 
//         </Box>
//       </div>

//       {loading ? (
//         <CircularProgress sx={{ mt: 2 }} />
//       ) : error ? (
//         <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
//       ) : (
//         <>
//           <TableContainer component={Paper} sx={{ mt: 2 }}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#1976d2' }}>
//                   {['id', 'name', 'email', 'role', 'created_at', 'action'].map((col) => (
//                     <TableCell key={col} sx={{ color: '#fff', fontWeight: 'bold' }}>
//                       <TableSortLabel
//                         active={orderBy === col}
//                         direction={orderBy === col ? order : 'asc'}
//                         onClick={() => handleSort(col)}
//                         sx={{ color: '#fff' }}
//                       >
//                         {col.replace('_', ' ').toUpperCase()}
//                       </TableSortLabel>
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedUsers.map((user, index) => (
//                   <TableRow key={user.id}  sx={{ 
//                       backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#fff',
//                       '&:hover': {
//                           transform: 'translateY(-2px)',
//                           boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
//                        } 
//                     }}>
//                     <TableCell>{user.id}</TableCell>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
//                     <TableCell>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         onClick={() => handleEdit(user)}
//                       >
//                         Edit
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             component="div"
//             count={users.length}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={(e) => {
//               setRowsPerPage(parseInt(e.target.value, 10));
//               setPage(0);
//             }}
//           />
//         </>
//       )}

//       <EditPlatformUserModal
//         open={editOpen}
//         onClose={() => setEditOpen(false)}
//         userData={selectedUser}
//         onUpdated={fetchUsers}
//       />
//     </MainCard>
//   );
// }




import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  TableSortLabel,
  TablePagination,
  Box,
  Button
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import PlatformUserRegistration from './PlatformUserRegistration';
import EditPlatformUserModal from './EditPlatformUserModal'; // adjust path

export default function PlatformUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/api/users`);
      setUsers(res.data.users);
      setError(null);
    } catch (err) {
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Sorting logic
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];

    if (orderBy === 'created_at') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else {
      aValue = aValue?.toString().toLowerCase();
      bValue = bValue?.toString().toLowerCase();
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <MainCard
      sx={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)'
        }
      }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '20px 16px',
            borderRadius: '8px'
          }}
        >
          <span>Platform User</span>
        </div>
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2" gutterBottom>
          Below is a list of platform users.
        </Typography>
        <Box sx={{ p: 2 }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add New Platform User
          </Button>

          <PlatformUserRegistration
            open={open}
            setOpen={setOpen}
            onSuccess={fetchUsers} // refresh list after adding
          />
        </Box>
      </div>

      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  {['id', 'name', 'email', 'role', 'created_at'].map((col) => (
                    <TableCell key={col} sx={{ color: '#fff', fontWeight: 'bold' }}>
                      <TableSortLabel
                        active={orderBy === col}
                        direction={orderBy === col ? order : 'asc'}
                        onClick={() => handleSort(col)}
                        sx={{ color: '#fff' }}
                      >
                        {col.replace('_', ' ').toUpperCase()}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#fff',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                      }
                    }}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" onClick={() => handleEdit(user)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={users.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </>
      )}

      <EditPlatformUserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        userData={selectedUser}
        onUpdated={fetchUsers} // refresh list after edit
      />
    </MainCard>
  );
}
