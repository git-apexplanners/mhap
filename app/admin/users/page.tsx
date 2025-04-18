"use client";

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Plus, Save, Mail, Shield } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
// import { Switch } from '@/components/ui/switch'; // Unused import

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at: string | null;
}

export default function UsersPage() {
  // const router = useRouter(); // Unused - uncomment if needed
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'editor',
  });

  // Define fetchUsers with useCallback to prevent it from changing on every render
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // In a real application, you would have a server-side API to fetch users
      // For this example, we'll simulate it with a mock response
      // In production, you would use Supabase's admin API or a custom backend

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data - in a real app, this would come from your backend
      const mockUsers = [
        {
          id: '1',
          email: 'admin@example.com',
          role: 'admin',
          created_at: '2023-01-01T00:00:00Z',
          last_sign_in_at: '2023-06-15T10:30:00Z',
        },
        {
          id: '2',
          email: 'editor@example.com',
          role: 'editor',
          created_at: '2023-02-15T00:00:00Z',
          last_sign_in_at: '2023-06-10T14:20:00Z',
        },
        {
          id: '3',
          email: 'contributor@example.com',
          role: 'contributor',
          created_at: '2023-03-20T00:00:00Z',
          last_sign_in_at: null,
        },
      ];

      setUsers(mockUsers);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]); // Add toast as a dependency since it's used inside the callback

  // Call fetchUsers when component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Include fetchUsers in the dependency array

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({
      email: '',
      password: '',
      role: 'editor',
    });
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      password: '',
      role: user.role,
    });
    setDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setEditingUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!editingUser) return;

    try {
      // In a real application, you would call your backend API to delete the user
      // For this example, we'll simulate success

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Remove user from local state
      setUsers(users.filter(user => user.id !== editingUser.id));

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate form
      if (!formData.email) {
        throw new Error("Email is required");
      }

      if (!editingUser && !formData.password) {
        throw new Error("Password is required for new users");
      }

      // In a real application, you would call your backend API to create/update the user
      // For this example, we'll simulate success

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (editingUser) {
        // Update existing user in local state
        setUsers(users.map(user =>
          user.id === editingUser.id
            ? { ...user, email: formData.email, role: formData.role }
            : user
        ));

        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else {
        // Add new user to local state
        const newUser = {
          id: Date.now().toString(), // Mock ID
          email: formData.email,
          role: formData.role,
          created_at: new Date().toISOString(),
          last_sign_in_at: null,
        };

        setUsers([...users, newUser]);

        toast({
          title: "Success",
          description: "User created successfully",
        });
      }

      setDialogOpen(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-primary/10 text-primary';
      case 'editor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'contributor':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={handleCreateUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="bg-card p-4 rounded-lg border">
        <p className="text-sm text-muted-foreground">
          <Shield className="h-4 w-4 inline-block mr-2" />
          This is a demonstration of user management functionality. In a production environment,
          you would implement proper authentication and authorization with Supabase Auth or a similar service.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Sign In</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No users found. Create your first user to get started.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>{formatDate(user.last_sign_in_at)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user)}
                          disabled={user.role === 'admin'} // Prevent deleting admin users
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit User Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Create User'}</DialogTitle>
            <DialogDescription>
              {editingUser
                ? 'Update the details of this user.'
                : 'Add a new user to the system.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({
                  ...formData,
                  email: e.target.value,
                })}
              />
            </div>
            {!editingUser && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({
                    ...formData,
                    password: e.target.value,
                  })}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({
                  ...formData,
                  role: value,
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="contributor">Contributor</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Admin can manage all aspects of the site. Editors can create and edit content. Contributors can only create content.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              {editingUser ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the user &quot;{editingUser?.email}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
