"use client";

import { useEffect, useState } from "react";
import ProposalCard1 from "../card/ProposalCard1";
import DashboardNavigation from "../header/DashboardNavigation";
import DeleteModal from "../modal/Companion/DeleteModal";
import ProposalModal1 from "../modal/Companion/ProposalModal1";
import { CIcon } from "@coreui/icons-react";
import { cibAddthis } from "@coreui/icons";
import PostModal from "../modal/Companion/PostModal";
import Pagination1 from "@/components/section/Pagination1";
import Loader from "@/components/loader/Loader";

export default function CompanionInfo() {
  const [companions, setCompanions] = useState([]);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  // Fetch companions
  async function fetchCompanions() {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `/api/companions?page=${currentPage}&limit=10&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setCompanions(data.companions);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching companions:", error);
    } finally {
      setLoading(false); // End loading
    }
  }

  async function fetchCategories() {
    try {
      const response = await fetch(
        `/api/categories?page=1&limit=100&search=${encodeURIComponent("")}`
      );
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const handleEdit = (companion) => {
    setSelectedCompanion(companion);
  };

  const handleDelete = (companion) => {
    setSelectedCompanion(companion);
  };

  const handleSaveCompanion = async (updatedCompanion) => {
    try {
      const response = await fetch(`/api/companions/${updatedCompanion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCompanion),
      });
      const data = await response.json();
      setCompanions(companions.map((c) => (c.id === data.id ? data : c)));
    } catch (error) {
      console.error("Error updating companion:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`/api/companions/${selectedCompanion.id}`, {
        method: "DELETE",
      });
      setCompanions(companions.filter((c) => c.id !== selectedCompanion.id));
    } catch (error) {
      console.error("Error deleting companion:", error);
    }
  };

  const handlePostSave = async (newCompanion) => {
    try {
      const response = await fetch("/api/companions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCompanion),
      });
      if (!response.ok) {
        throw new Error("Failed to create companion");
      }
      const data = await response.json();
      setCompanions([...companions, data]);
      fetchCompanions();
    } catch (error) {
      console.error("Error posting companion:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchCompanions();
    fetchCategories();
  }, [currentPage, searchQuery, totalPages]);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area items-center justify-between p-4 bg-white shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex justify-between w-52 h-12 items-center">
                  <h2 className="text-xl font-semibold">Companions</h2>
                  <CIcon
                    icon={cibAddthis}
                    data-bs-toggle="modal"
                    data-bs-target="#companionPostModal"
                    className="px-7 py-2 rounded-lg transition-colors hover:cursor-pointer hover:px-6"
               
                  />
                </div>
                <div className="row flex items-center">
                  <div className="col-lg-12">
                    <input
                      type="text"
                      placeholder="Search Companions"
                      className="form-input px-4 py-2 border rounded-lg w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head text-center align-items-center">
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Companion Name</th>
                      <th scope="col">Description</th>
                      <th scope="col" className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <Loader />
                        </td>
                      </tr>
                    ) : (
                      companions?.map((item, i) => (
                        <ProposalCard1
                          key={i}
                          data={item}
                          onEdit={() => handleEdit(item)}
                          onDelete={() => handleDelete(item)}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {totalPages > 1 && (
          <Pagination1
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <ProposalModal1
        companion={selectedCompanion}
        onSave={handleSaveCompanion}
        categories={categories}
      />
      <DeleteModal onConfirm={handleDeleteConfirm} />
      <PostModal onSave={handlePostSave} categories={categories} />
    </>
  );
}
